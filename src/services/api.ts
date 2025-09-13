import axios from 'axios';
import type { 
  SearchResponse, 
  InVideoSearchRequest, 
  InVideoSearchResponse, 
  SummarizeRequest, 
  SummarizeResponse 
} from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const searchVideos = async (query: string, maxResults: number = 20): Promise<SearchResponse> => {
  const response = await api.get('/api/search', {
    params: { query, maxresults: maxResults }
  });
  return response.data;
};

export const searchInVideo = async (request: InVideoSearchRequest): Promise<InVideoSearchResponse> => {
  const response = await api.post('/api/invideo_search', request);
  return response.data;
};

export const summarizeVideo = async (request: SummarizeRequest): Promise<SummarizeResponse> => {
  const response = await api.post('/api/summarize', request);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get('/health');
  return response.data;
};