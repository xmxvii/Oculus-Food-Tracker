import React from 'react';
import { PhotoIcon, CameraIcon, SparklesIcon } from '@heroicons/react/24/outline';
import foodPic from '../assets/food_pic.webp';
import avocadoToast from '../assets/avocado_toast.png';
import pasta from '../assets/pasta.jpg';
import chickenSalad from '../assets/chicken_salad.jpg';

function Landing({ navigateTo }) {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="py-6 px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-center md:text-left text-primary-300">
          Oculus Food Vision
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-300 mb-6 drop-shadow-lg">
            AI-Powered Food Analysis
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10">
            Discover the nutritional secrets of your meals with cutting-edge AI and computer vision technology.
          </p>

          {/* Steps Section */}
          <div className="w-full mb-10">
            <h2 className="text-3xl font-semibold text-primary-100 mb-8">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=JzdK0pjdJje5&format=png&color=000000"
                  alt="Step 1"
                  className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                <p className="text-gray-300">Take a photo, or upload an image of your food.</p>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=uJaWH7RDBEFn&format=png&color=000000"
                  alt="Step 2"
                  className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                <p className="text-gray-300">Oculus AI analyzes for a few seconds..</p>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=VKwJErijPZWk&format=png&color=000000"
                  alt="Step 3"
                  className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                <p className="text-gray-300">Receive instant nutritional analysis!</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => navigateTo('food-tracker')}
          >
            Get Started
          </button>
        </div>

        {/* History Section */}
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-16">
          <h2 className="text-3xl font-semibold text-primary-100 mb-6">Your History</h2>
          <p className="text-gray-300 mb-4">
            View your previous entries and track your nutrition journey over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example History Items */}
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <img
                src={chickenSalad}
                alt="Chicken Salad"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <p className="text-primary-300 font-bold">Chicken Salad</p>
              <p className="text-gray-400 text-sm">500 kcal</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <img
                src={pasta}
                alt="Pasta"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <p className="text-primary-300 font-bold">Pasta</p>
              <p className="text-gray-400 text-sm">600 kcal</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <img
                src={avocadoToast}
                alt="Avocado Toast"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <p className="text-primary-300 font-bold">Avocado Toast</p>
              <p className="text-gray-400 text-sm">300 kcal</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <h2 className="text-3xl font-semibold text-primary-100 mb-6">Become the healthiest version of yourself with a nutrition tracking solution easy enough to stick with
          </h2>
          <img 
            src={foodPic}
            alt="Aziz foodie"
            className="w-32 h-32 object-cover rounded-full shadow-lg" 
            />
            </div>
          <button
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => navigateTo('food-tracker')}
          >
            Get Started
          </button>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Oculus AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
