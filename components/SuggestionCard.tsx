import React from 'react';

interface SuggestionCardProps {
  title: string;
  description: string;
  type: 'hashtag' | 'idea';
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, description, type }) => {
  const borderColorClass = type === 'hashtag' ? 'border-cyan-500/50' : 'border-amber-500/50';
  const titleColorClass = type === 'hashtag' ? 'text-cyan-600 dark:text-cyan-300' : 'text-amber-600 dark:text-amber-300';
  
  const Icon = () => {
    if (type === 'hashtag') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  };

  return (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border-t-4 ${borderColorClass} shadow-lg h-full flex flex-col transition-transform transform hover:-translate-y-1`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon />
        <h3 className={`text-xl font-bold ${titleColorClass}`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
        {description}
      </p>
    </div>
  );
};

export default SuggestionCard;