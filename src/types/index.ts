export interface VideoInfo {
  video_id: string;
  title: string;
  description: string;
  url: string;
}

export interface SearchResponse {
  query: string;
  results: VideoInfo[];
  total_results: number;
}

export interface InVideoMatch {
  time: string;
  seconds: string;
  text: string;
  url: string;
}

export interface InVideoSearchRequest {
  video_url: string;
  prompt: string;
  top_k?: number;
}

export interface InVideoSearchResponse {
  video_url: string;
  prompt: string;
  matches: InVideoMatch[];
}

export interface SummarizeRequest {
  video_url: string;
}

export interface SummarizeResponse {
  video_url: string;
  summary: string;
}