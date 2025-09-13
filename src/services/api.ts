import axios from 'axios';
import { SearchResponse, InVideoSearchResponse, SummarizeResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error(error.message || 'An unexpected error occurred');
  }
);

export const searchVideos = async (query: string, maxResults: number = 20): Promise<SearchResponse> => {
  const response = await api.get('/api/search', {
    params: { query, maxresults: maxResults }
  });
  return response.data;
};

export const searchInVideo = async (
  videoUrl: string, 
  prompt: string, 
  topK: number = 5
): Promise<InVideoSearchResponse> => {
  const response = await api.post('/api/invideo_search', {
    video_url: videoUrl,
    prompt,
    top_k: topK
  });
  return response.data;
};

export const summarizeVideo = async (videoUrl: string): Promise<SummarizeResponse> => {
  const response = await api.post('/api/summarize', {
    video_url: videoUrl
  });
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get('/health');
  return response.data;
};