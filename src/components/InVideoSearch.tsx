import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MagnifyingGlassIcon, ClockIcon, ExternalLinkIcon } from '@heroicons/react/24/outline';
import { searchInVideo } from '../services/api';
import { InVideoMatch } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface InVideoSearchProps {
  videoUrl: string;
  videoTitle: string;
  onClose: () => void;
}

const InVideoSearch: React.FC<InVideoSearchProps> = ({ videoUrl, videoTitle, onClose }) => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<InVideoMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchInVideo(videoUrl, query.trim());
      setMatches(response.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Search Inside Video</h2>
              <p className="text-sm text-gray-600 mt-1 truncate max-w-md">{videoTitle}</p>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for specific moments in this video..."
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !query.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute inset-y-0 right-0 px-4 btn-primary rounded-l-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </motion.button>
              </div>
            </form>

            <div className="max-h-96 overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner />
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
                >
                  <p className="font-medium">Search Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </motion.div>
              )}

              {hasSearched && !loading && !error && matches.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No matches found</p>
                  <p className="text-gray-400 text-sm mt-1">Try different search terms</p>
                </motion.div>
              )}

              {matches.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    Found {matches.length} matching moment{matches.length !== 1 ? 's' : ''}
                  </p>
                  {matches.map((match, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <ClockIcon className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600">{match.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{match.text}</p>
                        </div>
                        <motion.a
                          href={match.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-4 p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors duration-200"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InVideoSearch;