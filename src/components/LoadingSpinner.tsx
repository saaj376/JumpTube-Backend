import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-youtube-red border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-600 mt-4 font-medium">{message}</p>
    </motion.div>
  );
}