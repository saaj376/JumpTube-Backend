import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, MagnifyingGlassIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
              <PlayIcon className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Jump to Any
            <span className="gradient-text block">YouTube Moment</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Search YouTube videos, find specific moments with AI-powered timestamp search, 
            and get instant summaries. The smartest way to navigate video content.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-xl mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Video Search</h3>
              <p className="text-gray-600 text-center">
                Find exactly what you're looking for across millions of YouTube videos
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-xl mb-4">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Timestamp Precision</h3>
              <p className="text-gray-600 text-center">
                Jump directly to specific moments within any video using AI search
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-xl mb-4">
                <SparklesIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Summaries</h3>
              <p className="text-gray-600 text-center">
                Get concise, intelligent summaries of any video content instantly
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.a
              href="#search"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Searching
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;