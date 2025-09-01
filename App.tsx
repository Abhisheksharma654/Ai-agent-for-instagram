
import React, { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import SuggestionCard from './components/SuggestionCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getSuggestions } from './services/geminiService';
import { SuggestionResponse } from './types';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SuggestionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (accountDescription: string, accountGoals: string, trainingData: string) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await getSuggestions(accountDescription, accountGoals, trainingData);
      setSuggestions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const HashtagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );

  const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg text-gray-400 mb-8">
            Describe your social media account, set your goals, and provide extra context to train our AI. We'll generate trending hashtags and growth strategies tailored for you.
          </p>
          <UserInput onGenerate={handleGenerate} isLoading={isLoading} />

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {suggestions && (
            <div className="mt-12 space-y-12 animate-fade-in">
              {/* Hashtags Section */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <HashtagIcon />
                  <h2 className="text-3xl font-bold text-white">Trending Hashtags</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.hashtags.map((h, index) => (
                    <SuggestionCard
                      key={index}
                      title={h.hashtag}
                      description={h.reason}
                      type="hashtag"
                    />
                  ))}
                </div>
              </div>

              {/* Growth Ideas Section */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <LightbulbIcon />
                  <h2 className="text-3xl font-bold text-white">Growth Ideas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestions.growthIdeas.map((idea, index) => (
                    <SuggestionCard
                      key={index}
                      title={idea.title}
                      description={idea.description}
                      type="idea"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
