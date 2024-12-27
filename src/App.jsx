import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import Camera from './components/Camera';
import FoodInfo from './components/FoodInfo';
import History from './components/History';
import Header from './components/Header';
import { analyzeImage } from './services/claudeApi';
import config from './config';

function App() {
  const [foodData, setFoodData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState(false);

  useEffect(() => {
    // Check server status
    fetch(`${config.apiBaseUrl}/health`)
      .then(response => response.ok && setServerStatus(true))
      .catch(() => setServerStatus(false));

    const savedHistory = localStorage.getItem('foodHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleImage = async (imageData) => {
    if (!serverStatus && !import.meta.env.PROD) {
      setError('Server is not running. Please start the server first.');
      return;
    }

    setUploadedImage(imageData);
    setIsAnalyzing(true);
    setError(null);
    setFoodData(null);

    try {
      const analysis = await analyzeImage(imageData);
      const foodInfo = {
        ...analysis,
        timestamp: new Date().toISOString()
      };

      setFoodData(foodInfo);
      const newHistory = [{
        ...foodInfo,
        image: imageData
      }, ...history].slice(0, 10);
      
      setHistory(newHistory);
      localStorage.setItem('foodHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Analyze Your Food
          </h2>

          {!serverStatus && !import.meta.env.PROD && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-center">
                ⚠️ Server is not running. Please start the server first.
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center mb-8">
            <ImageUpload 
              onImageUpload={handleImage} 
              disabled={isAnalyzing || (!serverStatus && !import.meta.env.PROD)} 
            />
            <Camera 
              onCapture={handleImage} 
              disabled={isAnalyzing || (!serverStatus && !import.meta.env.PROD)} 
            />
          </div>
          
          {isAnalyzing && (
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
                <p className="text-primary-700 font-medium">
                  Analyzing your food with AI...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 mb-2">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="btn btn-danger text-sm"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
        
        {foodData && uploadedImage && !isAnalyzing && (
          <FoodInfo food={foodData} image={uploadedImage} />
        )}
        
        <History items={history} onClear={() => {
          setHistory([]);
          localStorage.removeItem('foodHistory');
        }} />
      </main>

      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        <p>Powered by OpenAI GPT-4 Vision</p>
      </footer>
    </div>
  );
}

export default App;
