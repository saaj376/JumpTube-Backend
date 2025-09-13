import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
              <PlayIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">JumpTube</h1>
              <p className="text-xs text-gray-500 -mt-1">Smart YouTube Search</p>
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#search" 
              className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Search
            </a>
            <a 
              href="#features" 
              className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;