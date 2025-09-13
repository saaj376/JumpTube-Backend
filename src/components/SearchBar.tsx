import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function SearchBar({ onSearch, loading = false, placeholder = "Search YouTube videos..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-youtube-red to-red-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-xl border-2 border-gray-100 group-hover:border-youtube-red/20 transition-all duration-300 shadow-lg">
            <div className="flex items-center">
              <div className="pl-4 pr-2">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-hover:text-youtube-red transition-colors duration-200" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 py-4 px-2 bg-transparent border-none outline-none text-lg placeholder-gray-400 focus:placeholder-gray-300"
                disabled={loading}
              />
              <motion.button
                type="submit"
                disabled={loading || !query.trim()}
                className="m-2 px-6 py-3 bg-youtube-red text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5" />
                    <span>Search</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}