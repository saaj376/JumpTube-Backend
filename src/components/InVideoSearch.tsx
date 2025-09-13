import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ClockIcon, ExternalLinkIcon } from '@heroicons/react/24/outline';
import { searchInVideo } from '../services/api';
import type { InVideoMatch } from '../types';

interface InVideoSearchProps {
  videoUrl: string;
  onClose: () => void;
}

export default function InVideoSearch({ videoUrl, onClose }: InVideoSearchProps) {
  const [prompt, setPrompt] = useState('');
  const [matches, setMatches] = useState<InVideoMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await searchInVideo({
        video_url: videoUrl,
        prompt: prompt.trim(),
        top_k: 10
      });
      setMatches(response.matches);
    } catch (err) {
      setError('Failed to search within video. Please try again.');
      console.error('In-video search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Search Inside Video</h2>
            <p className="text-gray-600 text-sm mt-1">Find specific moments in this video</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What are you looking for in this video?"
                className="flex-1 input-field"
                disabled={loading}
              />
              <motion.button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Search'
                )}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>
              {matches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {matches.map((match, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <ClockIcon className="h-4 w-4 text-youtube-red" />
                            <span className="font-medium text-youtube-red">{match.time}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{match.text}</p>
                        </div>
                        <motion.a
                          href={match.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-gray-400 hover:text-youtube-red transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLinkIcon className="h-5 w-5" />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!loading && matches.length === 0 && prompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500"
              >
                <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No matches found for "{prompt}"</p>
                <p className="text-sm mt-1">Try different keywords or phrases</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}