import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, DocumentTextIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { summarizeVideo } from '../services/api';
import { copyToClipboard } from '../utils';
import LoadingSpinner from './LoadingSpinner';

interface VideoSummaryProps {
  videoUrl: string;
  videoTitle: string;
  onClose: () => void;
}

const VideoSummary: React.FC<VideoSummaryProps> = ({ videoUrl, videoTitle, onClose }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await summarizeVideo(videoUrl);
        setSummary(response.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [videoUrl]);

  const handleCopy = async () => {
    const success = await copyToClipboard(summary);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <DocumentTextIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Video Summary</h2>
                <p className="text-sm text-gray-600 mt-1 truncate max-w-md">{videoTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {summary && (
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              )}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </div>

          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <LoadingSpinner />
                <p className="text-gray-600 mt-4">Generating AI summary...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
              >
                <DocumentTextIcon className="h-12 w-12 text-red-300 mx-auto mb-4" />
                <p className="font-medium text-red-700 mb-2">Summary Generation Failed</p>
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-gray max-w-none"
              >
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-700">AI Generated Summary</span>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                  <p>
                    <strong>Note:</strong> This summary was generated using AI and may not capture all nuances of the video content. 
                    For complete information, please watch the full video.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoSummary;