import { motion } from 'framer-motion';
import { PlayIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { truncateText, extractVideoId } from '../utils';
import type { VideoInfo } from '../types';

interface VideoCardProps {
  video: VideoInfo;
  onInVideoSearch: (videoUrl: string) => void;
  onSummarize: (videoUrl: string) => void;
  index: number;
}

export default function VideoCard({ video, onInVideoSearch, onSummarize, index }: VideoCardProps) {
  const videoId = extractVideoId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <motion.a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 bg-youtube-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PlayIcon className="h-6 w-6" />
          </motion.a>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-youtube-red transition-colors duration-200">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(video.description, 150)}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <motion.button
            onClick={() => onInVideoSearch(video.url)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ClockIcon className="h-4 w-4" />
            <span>Search Inside</span>
          </motion.button>
          
          <motion.button
            onClick={() => onSummarize(video.url)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-youtube-red hover:bg-red-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DocumentTextIcon className="h-4 w-4" />
            <span>Summarize</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}