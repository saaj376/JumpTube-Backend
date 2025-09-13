import { motion } from 'framer-motion';
import { PlayIcon, ClockIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const features = [
    {
      icon: <PlayIcon className="h-6 w-6" />,
      title: "Smart Search",
      description: "Find YouTube videos with intelligent search algorithms"
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Timestamp Search",
      description: "Jump to specific moments within videos instantly"
    },
    {
      icon: <DocumentTextIcon className="h-6 w-6" />,
      title: "AI Summaries",
      description: "Get concise summaries of video content powered by AI"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-youtube-red/10 text-youtube-red px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SparklesIcon className="h-4 w-4" />
            <span>Powered by AI</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Search YouTube
            <span className="gradient-text block">Smarter</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover videos, find specific moments, and get AI-powered summaries. 
            JumpTube makes YouTube search intelligent and efficient.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-youtube-red/10 text-youtube-red rounded-2xl mb-4 group-hover:bg-youtube-red group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}