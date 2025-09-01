import React, { useState } from 'react';

interface UserInputProps {
  onGenerate: (accountDescription: string, accountGoals: string, trainingData: string) => void;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onGenerate, isLoading }) => {
  const [handle, setHandle] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<{ name: string; handle: string; imageUrl: string } | null>(null);

  const [accountDescription, setAccountDescription] = useState('');
  const [accountGoals, setAccountGoals] = useState('');
  const [trainingData, setTrainingData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFetchAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setIsFetching(true);
    setFetchedUser(null);
    setError(null);

    // Simulate an API call to fetch Instagram data
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real application, you would fetch real data here.
    // For this simulation, we'll use placeholder data.
    setFetchedUser({
      name: 'Demo Photographer',
      handle: handle,
      imageUrl: `https://avatar.vercel.sh/${handle}.png?text=${handle.substring(0,2)}`, // Generates a unique placeholder avatar
    });

    // Pre-fill the form with high-quality sample data
    setAccountDescription(`A travel photography account (@${handle}) showcasing landscapes from Southeast Asia. Focus on vibrant colors and drone shots. Current bio: "Exploring Asia one photo at a time 🌏 | Drone pilot | Coffee enthusiast"`);
    setAccountGoals("Grow my audience of travel lovers, collaborate with travel brands, and increase engagement on my posts to over 10%.");
    setTrainingData(`Recent posts from @${handle} include: 'Sunrise over Ha Long Bay', 'Bangkok Street Food Tour', 'Bali's Rice Terraces'. I like the style of @chrisburkard and @shortstache. My captions are usually short and inspirational.`);

    setIsFetching(false);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountDescription.trim()) {
      setError('Account description is required. Fetch an account or fill it in manually.');
      return;
    }
    setError(null);
    onGenerate(accountDescription, accountGoals, trainingData);
  };
  
  const commonTextAreaClasses = "w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 placeholder-gray-500 resize-none";
  const commonInputClasses = "w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 placeholder-gray-400";

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-2xl">
      <form onSubmit={handleFetchAccount} className="mb-6">
        <label htmlFor="instagram-handle" className="block text-lg font-semibold mb-2 text-cyan-300">
          Instagram Handle
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto flex-grow">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">@</span>
            <input
              id="instagram-handle"
              type="text"
              placeholder="e.g., travel_photographer"
              className={`${commonInputClasses} pl-8`}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isFetching || !handle}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
          >
            {isFetching ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Fetching...
              </>
            ) : 'Fetch Account (Simulated)'}
          </button>
        </div>
      </form>
      
      {fetchedUser && (
        <div className="my-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center space-x-4 animate-fade-in">
            <img src={fetchedUser.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-cyan-500" />
            <div className="flex-grow">
                <p className="font-bold text-lg text-white">{fetchedUser.name}</p>
                <p className="text-gray-400">@{fetchedUser.handle}</p>
                <p className="text-sm text-green-400 mt-1">Success! We've pre-filled the form below with simulated data.</p>
            </div>
        </div>
      )}

      <div className="my-6 flex items-center justify-center">
          <span className="h-px bg-gray-600 flex-grow"></span>
          <span className="px-4 text-gray-400 font-semibold">ACCOUNT DETAILS</span>
          <span className="h-px bg-gray-600 flex-grow"></span>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label htmlFor="account-description" className="block text-lg font-semibold mb-2 text-cyan-300">
            Account Description
          </label>
          <textarea
            id="account-description"
            rows={3}
            className={commonTextAreaClasses}
            placeholder="e.g., A food blog focusing on vegan Italian recipes, with a rustic and cozy aesthetic."
            value={accountDescription}
            onChange={(e) => setAccountDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="account-goals" className="block text-lg font-semibold mb-2 text-cyan-300">
            Account Goals
          </label>
          <textarea
            id="account-goals"
            rows={2}
            className={commonTextAreaClasses}
            placeholder="e.g., Increase engagement, reach a wider audience of food lovers, grow followers to 10k."
            value={accountGoals}
            onChange={(e) => setAccountGoals(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="training-data" className="block text-lg font-semibold mb-2 text-cyan-300">
            Train the Agent (Optional)
          </label>
          <textarea
            id="training-data"
            rows={4}
            className={commonTextAreaClasses}
            placeholder="Provide examples of posts you like, topics you want to cover, or specific brand voice keywords. The more context, the better the suggestions!"
            value={trainingData}
            onChange={(e) => setTrainingData(e.target.value)}
          />
        </div>
        
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !accountDescription}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Suggestions'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserInput;
