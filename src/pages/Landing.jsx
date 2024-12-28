import React from 'react';
import { Camera, Sparkles, ListChecks, LineChart, PieChart, MessageSquare } from 'lucide-react';

function Landing({ navigateTo }) {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 min-h-screen flex flex-col text-white">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16 mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-300 mb-6 drop-shadow-lg">
            AI-Powered Food Analysis
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10">
            Discover the nutritional secrets of your meals with cutting-edge AI and computer vision technology.
          </p>

          {/* Steps Section */}
          <div className="w-full mb-10">
            <h2 className="text-3xl font-semibold text-emerald-100 mb-8">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4 transform transition-all duration-300 hover:scale-105">
                <Camera className="w-16 h-16 text-emerald-300" />
                <p className="text-gray-300">Take a photo or upload an image of your food</p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4 transform transition-all duration-300 hover:scale-105">
                <Sparkles className="w-16 h-16 text-emerald-300" />
                <p className="text-gray-300">Our AI analyzes your meal in seconds</p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center gap-4 transform transition-all duration-300 hover:scale-105">
                <PieChart className="w-16 h-16 text-emerald-300" />
                <p className="text-gray-300">Get instant nutritional insights</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Recent Analysis Section */}
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-emerald-100 mb-6">Recent Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Fresh Salad",
                calories: "320",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Grilled Salmon",
                calories: "450",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Quinoa Bowl",
                calories: "380",
                image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Fruit Smoothie",
                calories: "220",
                image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=300&q=80"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-emerald-300 font-bold text-lg">{item.name}</p>
                <p className="text-gray-400">{item.calories} kcal</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <LineChart className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-400">Monitor your nutrition journey with detailed analytics</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <ListChecks className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meal Planning</h3>
              <p className="text-gray-400">Create and save your favorite meal plans</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <MessageSquare className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-gray-400">Get personalized nutrition recommendations</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Oculus AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
