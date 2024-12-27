import React from 'react';

function History({ items, onClear }) {
  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">History</h2>
        <button 
          onClick={onClear}
          className="btn btn-danger"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div 
            key={item.timestamp} 
            className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-800 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.calories} calories
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
