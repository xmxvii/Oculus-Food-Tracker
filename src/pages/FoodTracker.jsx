import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import Camera from '../components/Camera';
import FoodInfo from '../components/FoodInfo';
import History from '../components/History';
import { analyzeImage } from '../services/claudeApi';

function FoodTracker() {
  const [foodData, setFoodData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('foodHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleImage = async (imageData) => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-8 shadow-md">
        <h1 className="text-3xl font-extrabold tracking-tight text-center md:text-left text-primary-300">
          Calorie Tracker
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-3xl font-semibold text-primary-300 mb-6 text-center">
            Analyze Your Food
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
            <ImageUpload 
              onImageUpload={handleImage} 
              disabled={isAnalyzing} 
            />
            <Camera 
              onCapture={handleImage} 
              disabled={isAnalyzing} 
            />
          </div>
          
          {isAnalyzing && (
            <div className="bg-primary-900 border border-primary-700 rounded-lg p-6 mb-6 text-center">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
                <p className="text-primary-300 font-medium">
                  Analyzing your food with AI...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
              <p className="text-red-300 mb-2 font-medium">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="bg-red-700 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
        
        {foodData && uploadedImage && !isAnalyzing && (
          <FoodInfo food={foodData} image={uploadedImage} />
        )}
        
        <History 
          items={history} 
          onClear={() => {
            setHistory([]);
            localStorage.removeItem('foodHistory');
          }} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Powered by OpenAI GPT-4 Vision</p>
      </footer>
    </div>
  );
}

export default FoodTracker;
