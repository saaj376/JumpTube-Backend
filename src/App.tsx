import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import VideoCard from './components/VideoCard';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { searchVideos } from './services/api';
import { Video } from './types';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query: string, maxResults: number) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentQuery(query);

    try {
      const response = await searchVideos(query, maxResults);
      setVideos(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!hasSearched && <Hero />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div id="search" className="mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <LoadingSpinner size="lg" />
              <p className="text-gray-600 mt-4 text-lg">Searching YouTube...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
            >
              <div className="text-red-600 mb-2">
                <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Search Error</h3>
              <p className="text-red-700">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Make sure your backend server is running on localhost:8000
              </p>
            </motion.div>
          )}

          {!loading && !error && hasSearched && videos.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmptyState type="no-results" query={currentQuery} />
            </motion.div>
          )}

          {!loading && !error && !hasSearched && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmptyState type="search" />
            </motion.div>
          )}

          {!loading && !error && videos.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  Found {videos.length} video{videos.length !== 1 ? 's' : ''} for "{currentQuery}"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={video.video_id} video={video} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with ❤️ using React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Powered by YouTube API and Gemini AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;