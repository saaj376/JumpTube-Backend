import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="mx-auto mb-6 text-gray-300">
        {icon || <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      <motion.div
        className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SparklesIcon className="h-4 w-4" />
        <span>Try searching for something interesting!</span>
      </motion.div>
    </motion.div>
  );
}