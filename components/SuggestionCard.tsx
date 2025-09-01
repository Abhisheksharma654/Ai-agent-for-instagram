
import React from 'react';

interface SuggestionCardProps {
  title: string;
  description: string;
  type: 'hashtag' | 'idea';
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, description, type }) => {
  const borderColorClass = type === 'hashtag' ? 'border-cyan-500/50' : 'border-amber-500/50';
  const titleColorClass = type === 'hashtag' ? 'text-cyan-300' : 'text-amber-300';
  
  return (
    <div className={`bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border-t-4 ${borderColorClass} shadow-lg h-full flex flex-col transition-transform transform hover:-translate-y-1`}>
      <h3 className={`text-xl font-bold mb-2 ${titleColorClass}`}>
        {title}
      </h3>
      <p className="text-gray-400 text-sm flex-grow">
        {description}
      </p>
    </div>
  );
};

export default SuggestionCard;
