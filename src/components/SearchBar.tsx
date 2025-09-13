import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string, maxResults: number) => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading = false, 
  placeholder = "Search YouTube videos..." 
}) => {
  const [query, setQuery] = useState('');
  const [maxResults, setMaxResults] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), maxResults);
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={loading}
            className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
            <motion.button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              type="submit"
              disabled={loading || !query.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                'Search'
              )}
            </motion.button>
          </div>
        </div>
        
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Max Results:</span>
                <select
                  value={maxResults}
                  onChange={(e) => setMaxResults(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default SearchBar;