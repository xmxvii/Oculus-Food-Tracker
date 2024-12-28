import React from 'react';

function Header({ navigateTo }) {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          {/* Cute Octopus Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigateTo('landing')}>
            <div className="logo-hover">
              <svg
                className="h-12 w-12 text-primary-500"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Body */}
                <circle cx="50" cy="45" r="25" fill="currentColor" />

                {/* Eyes */}
                <circle cx="42" cy="40" r="6" fill="white" />
                <circle cx="58" cy="40" r="6" fill="white" />
                <circle cx="42" cy="40" r="3" fill="black" />
                <circle cx="58" cy="40" r="3" fill="black" />

                {/* Blush */}
                <circle cx="35" cy="45" r="4" fill="#FFA5B5" fillOpacity="0.6" />
                <circle cx="65" cy="45" r="4" fill="#FFA5B5" fillOpacity="0.6" />

                {/* Smile */}
                <path
                  d="M44 48C47 51 53 51 56 48"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Tentacles */}
                <path
                  className="tentacle"
                  d="M35 60C35 70 30 75 25 80"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  className="tentacle"
                  d="M45 65C45 75 42 80 40 85"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  className="tentacle"
                  d="M55 65C55 75 58 80 60 85"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  className="tentacle"
                  d="M65 60C65 70 70 75 75 80"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Bubbles */}
                <circle cx="80" cy="30" r="4" fill="currentColor" fillOpacity="0.5" />
                <circle cx="85" cy="20" r="3" fill="currentColor" fillOpacity="0.3" />
                <circle cx="75" cy="15" r="2" fill="currentColor" fillOpacity="0.2" />
              </svg>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-2xl font-bold gradient-text">Oculus AI</span>
              <span className="text-xs text-primary-600 -mt-1 font-medium">Shazam for food</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => navigateTo('food-tracker')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
