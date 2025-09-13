import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Video } from '../types';
import { extractVideoId, getVideoThumbnail, truncateText } from '../utils';
import InVideoSearch from './InVideoSearch';
import VideoSummary from './VideoSummary';

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  const [showInVideoSearch, setShowInVideoSearch] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const videoId = extractVideoId(video.video_id);
  const thumbnail = videoId ? getVideoThumbnail(videoId, 'medium') : '';

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="card overflow-hidden group"
      >
        <div className="relative">
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/480x360/f3f4f6/9ca3af?text=Video+Thumbnail';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <motion.a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 text-white p-3 rounded-full shadow-lg"
            >
              <PlayIcon className="h-6 w-6" />
            </motion.a>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
            {video.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateText(video.description, 150)}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowInVideoSearch(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <ClockIcon className="h-4 w-4" />
                <span>Search Inside</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowSummary(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span>Summarize</span>
              </motion.button>
            </div>
            
            <motion.a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Watch →
            </motion.a>
          </div>
        </div>
      </motion.div>

      {showInVideoSearch && (
        <InVideoSearch
          videoUrl={video.url}
          videoTitle={video.title}
          onClose={() => setShowInVideoSearch(false)}
        />
      )}

      {showSummary && (
        <VideoSummary
          videoUrl={video.url}
          videoTitle={video.title}
          onClose={() => setShowSummary(false)}
        />
      )}
    </>
  );
};

export default VideoCard;