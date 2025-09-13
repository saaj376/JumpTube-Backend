import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import VideoCard from './components/VideoCard';
import InVideoSearch from './components/InVideoSearch';
import VideoSummary from './components/VideoSummary';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { searchVideos } from './services/api';
import type { VideoInfo } from './types';

function App() {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoForSearch, setSelectedVideoForSearch] = useState<string | null>(null);
  const [selectedVideoForSummary, setSelectedVideoForSummary] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    
    try {
      const response = await searchVideos(query, 20);
      setVideos(response.results);
    } catch (err) {
      setError('Failed to search videos. Please check if the backend is running.');
      console.error('Search error:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInVideoSearch = (videoUrl: string) => {
    setSelectedVideoForSearch(videoUrl);
  };

  const handleSummarize = (videoUrl: string) => {
    setSelectedVideoForSummary(videoUrl);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        
        <section id="search" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar onSearch={handleSearch} loading={loading} />
            
            {error && (
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                  <p className="font-medium">Search Error</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}
            
            <div className="mt-12">
              {loading && <LoadingSpinner message="Searching videos..." />}
              
              {!loading && videos.length === 0 && searchQuery && !error && (
                <EmptyState
                  title="No videos found"
                  description={`No results found for "${searchQuery}". Try different keywords or check your spelling.`}
                />
              )}
              
              {!loading && videos.length === 0 && !searchQuery && !error && (
                <EmptyState
                  title="Start your search"
                  description="Enter keywords above to find YouTube videos with intelligent search and AI-powered features."
                />
              )}
              
              {videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <VideoCard
                      key={video.video_id}
                      video={video}
                      onInVideoSearch={handleInVideoSearch}
                      onSummarize={handleSummarize}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedVideoForSearch && (
          <InVideoSearch
            videoUrl={selectedVideoForSearch}
            onClose={() => setSelectedVideoForSearch(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVideoForSummary && (
          <VideoSummary
            videoUrl={selectedVideoForSummary}
            onClose={() => setSelectedVideoForSummary(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;