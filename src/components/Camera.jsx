import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera({ onCapture, disabled }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const webcamRef = useRef(null);

  // Check camera permissions when component mounts
  useEffect(() => {
    checkCameraPermissions();
  }, []);

  const checkCameraPermissions = async () => {
    try {
      // Check if the browser supports the permissions API
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'camera' });
        setPermissionStatus(result.state);

        // Listen for permission changes
        result.addEventListener('change', () => {
          setPermissionStatus(result.state);
          if (result.state === 'granted') {
            setCameraError(null);
          }
        });
      }
    } catch (err) {
      console.error('Error checking permissions:', err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      setCameraError(null);
      setIsCapturing(true);
    } catch (err) {
      console.error('Permission error:', err);
      setPermissionStatus('denied');
      setCameraError('Camera access was denied');
    }
  };

  const handleCameraClick = async () => {
    if (permissionStatus === 'denied') {
      setCameraError('Camera access is blocked. Please enable it in your browser settings.');
      return;
    }

    if (permissionStatus === 'prompt') {
      await requestCameraPermission();
    } else {
      setIsCapturing(true);
    }
  };

  const handleUserMedia = useCallback((stream) => {
    setCameraError(null);
    setCameraReady(true);
    setPermissionStatus('granted');
  }, []);

  const handleCameraError = useCallback((err) => {
    console.error('Camera error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      setCameraError('Camera access was denied. Please enable camera permissions.');
      setPermissionStatus('denied');
    } else if (err.name === 'NotFoundError') {
      setCameraError('No camera found on your device.');
    } else {
      setCameraError('Error accessing camera: ' + err.message);
    }
    setCameraReady(false);
  }, []);

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
        setIsCapturing(false);
        setCountdown(null);
      }
    }
  }, [onCapture]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCapture();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleCapture]);

  const toggleCamera = useCallback(() => {
    setCameraReady(false);
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  }, []);

  return (
    <div>
      <button 
        onClick={handleCameraClick}
        disabled={disabled}
        className="btn btn-primary flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Take Photo
      </button>

      {isCapturing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full mx-4">
            {permissionStatus === 'denied' ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Camera Access Required</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Please enable camera access in your browser settings to use this feature.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">How to enable camera access:</h4>
                  <ol className="text-sm text-gray-600 list-decimal list-inside space-y-2">
                    <li>Click the camera icon in your browser's address bar</li>
                    <li>Select "Allow" for camera access</li>
                    <li>Refresh the page</li>
                  </ol>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setIsCapturing(false)}
                    className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsCapturing(false);
                      setTimeout(() => {
                        handleCameraClick();
                      }, 500);
                    }}
                    className="btn btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: facingMode,
                    aspectRatio: 16/9
                  }}
                  onUserMedia={handleUserMedia}
                  onUserMediaError={handleCameraError}
                  className="w-full rounded-lg"
                  mirrored={facingMode === "user"}
                />

                {/* Camera Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/20"></div>
                    ))}
                  </div>
                </div>

                {/* Focus Circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-primary-400 rounded-full opacity-50"></div>
                </div>

                {/* Countdown Display */}
                {countdown && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white bg-black/50 w-24 h-24 rounded-full flex items-center justify-center countdown">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Camera Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => setIsCapturing(false)}
                    className="btn bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Close
                  </button>

                  {cameraReady && (
                    <div className="flex gap-3">
                      <button
                        onClick={toggleCamera}
                        className="btn bg-gray-600 text-white hover:bg-gray-700"
                        title="Switch Camera"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                        </svg>
                      </button>

                      <button 
                        onClick={startCountdown}
                        className="btn btn-primary flex items-center gap-2"
                        disabled={!!countdown}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        {countdown ? `Capturing in ${countdown}...` : 'Capture Photo'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Camera Tips */}
                <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Center your food in the circle and ensure good lighting for best results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Camera;
