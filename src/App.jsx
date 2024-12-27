import React, { useState } from 'react';
import Landing from './pages/Landing';
import FoodTracker from './pages/FoodTracker';
import Header from './components/Header';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header navigateTo={navigateTo} />
      {currentPage === 'landing' && <Landing navigateTo={navigateTo} />}
      {currentPage === 'food-tracker' && <FoodTracker />}
    </div>
  );
}

export default App;
