import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function FoodInfo({ food, image }) {
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
    datasets: [
      {
        data: [
          food.macros?.protein || 0, // Handle missing or undefined values
          food.macros?.carbs || 0,
          food.macros?.fat || 0,
          food.macros?.fiber || 0
        ],
        backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#34d399'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, family: 'Inter, sans-serif' },
          padding: 20
        }
      }
    },
    cutout: '60%'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <img src={image} alt={food.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
          <h2 className="text-2xl font-bold text-gray-800">{food.name}</h2>
          <p className="text-xl font-semibold text-primary-600">{food.calories} calories</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Macronutrients</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">🥩 Protein</span>
                <span className="font-medium ">{food.macros?.protein || 0}g</span> </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">🌾 Carbs</span>
                <span className="font-medium">{food.macros?.carbs || 0}g</span> </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">🥑 Fat</span>
                <span className="font-medium">{food.macros?.fat || 0}g</span> </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">🥬 Fiber</span>
                <span className="font-medium">{food.macros?.fiber || 0}g</span> </li>
            </ul>
          </div>

          <div className="w-full max-w-xs mx-auto">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodInfo;
