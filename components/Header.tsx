
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          Social Growth AI Agent
        </h1>
      </div>
    </header>
  );
};

export default Header;
