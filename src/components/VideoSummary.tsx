import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { summarizeVideo } from '../services/api';

interface VideoSummaryProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoSummary({ videoUrl, onClose }: VideoSummaryProps) {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await summarizeVideo({ video_url: videoUrl });
        setSummary(response.summary);
      } catch (err) {
        setError('Failed to generate summary. Please try again.');
        console.error('Summary error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [videoUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-8 w-8 text-youtube-red" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Video Summary</h2>
              <p className="text-gray-600 text-sm mt-1">AI-generated summary of the video content</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {summary && (
              <motion.button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-youtube-red border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Generating summary...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5" />
                <span className="font-medium">Summary Generation Failed</span>
              </div>
              <p className="mt-2">{error}</p>
            </motion.div>
          )}

          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-gray max-w-none"
            >
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {summary}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}