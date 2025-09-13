import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  type: 'search' | 'no-results';
  query?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, query }) => {
  if (type === 'search') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center"
          >
            <PlayIcon className="h-12 w-12 text-white" />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2"
          >
            <SparklesIcon className="h-8 w-8 text-yellow-400" />
          </motion.div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Discover YouTube Content Like Never Before
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Search for videos, find specific moments within them, and get AI-powered summaries. 
          Start by entering your search query above.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-sm text-gray-600">
              Find YouTube videos with advanced search capabilities and filters
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-4">
              <PlayIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Timestamp Search</h3>
            <p className="text-sm text-gray-600">
              Jump to specific moments in videos by searching for content within them
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-4">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Summaries</h3>
            <p className="text-sm text-gray-600">
              Get concise, AI-generated summaries of any YouTube video
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
      <p className="text-gray-600 mb-4">
        We couldn't find any videos matching "{query}". Try different keywords or check your spelling.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-gray-600 font-medium mb-2">Search Tips:</p>
        <ul className="text-sm text-gray-500 space-y-1 text-left">
          <li>• Use specific keywords</li>
          <li>• Try different search terms</li>
          <li>• Check for typos</li>
          <li>• Use broader terms</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default EmptyState;