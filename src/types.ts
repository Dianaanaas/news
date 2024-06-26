export type NewsType = 'best' | 'top' | 'new';

export interface Comment {
  id: number;
  by: string;
  text: string;
  score?: number;
  time: number;
  kids?: number[];
}

export interface NewsItem {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  kids?: number[];
  score: number;
  type: string;
  descendants?: number;
  text?: string;
}
