import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  return (
    <header className="py-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          Social Growth AI Agent
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;