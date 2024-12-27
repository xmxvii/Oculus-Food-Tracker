import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Cute Octopus Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="logo-hover">
                <svg 
                  className="h-12 w-12 text-primary-500" 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Body */}
                  <circle 
                    cx="50" 
                    cy="45" 
                    r="25" 
                    fill="currentColor"
                  />
                  
                  {/* Eyes */}
                  <circle 
                    cx="42" 
                    cy="40" 
                    r="6" 
                    fill="white"
                  />
                  <circle 
                    cx="58" 
                    cy="40" 
                    r="6" 
                    fill="white"
                  />
                  <circle 
                    cx="42" 
                    cy="40" 
                    r="3" 
                    fill="black"
                  />
                  <circle 
                    cx="58" 
                    cy="40" 
                    r="3" 
                    fill="black"
                  />
                  
                  {/* Blush */}
                  <circle 
                    cx="35" 
                    cy="45" 
                    r="4" 
                    fill="#FFA5B5" 
                    fillOpacity="0.6"
                  />
                  <circle 
                    cx="65" 
                    cy="45" 
                    r="4" 
                    fill="#FFA5B5" 
                    fillOpacity="0.6"
                  />
                  
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
                  <circle 
                    cx="80" 
                    cy="30" 
                    r="4" 
                    fill="currentColor" 
                    fillOpacity="0.5"
                  />
                  <circle 
                    cx="85" 
                    cy="20" 
                    r="3" 
                    fill="currentColor" 
                    fillOpacity="0.3"
                  />
                  <circle 
                    cx="75" 
                    cy="15" 
                    r="2" 
                    fill="currentColor" 
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-2xl font-bold gradient-text">Oculus</span>
                <span className="text-xs text-primary-600 -mt-1 font-medium">Shazam for food!</span>
              </div>
            </div>

            {/* Tagline */}
            <div className="hidden md:block ml-6 pl-6 border-l border-gray-200">
              <span className="text-sm text-gray-500">Shazam for food!</span>
            </div>
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <svg 
                className="h-5 w-5 text-primary-500 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
              Powered by GPT-4
            </div>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="View on GitHub"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
