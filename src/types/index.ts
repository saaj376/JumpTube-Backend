export interface Video {
  video_id: string;
  title: string;
  description: string;
  url: string;
}

export interface SearchResponse {
  query: string;
  results: Video[];
  total_results: number;
}

export interface InVideoMatch {
  time: string;
  seconds: string;
  text: string;
  url: string;
}

export interface InVideoSearchResponse {
  video_url: string;
  prompt: string;
  matches: InVideoMatch[];
}

export interface SummarizeResponse {
  video_url: string;
  summary: string;
}

export interface ApiError {
  detail: string;
}