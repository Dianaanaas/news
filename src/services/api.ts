import { NewsItem, Comment } from '../types';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchNewsIds = async (type: 'best' | 'new' | 'top'): Promise<number[]> => {
  const response = await fetch(`${BASE_URL}/${type}stories.json`);
  return response.json();
};

export const fetchNews = async (id: number): Promise<NewsItem> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
};

export const fetchComments = async (ids: number[]): Promise<Comment[]> => {
  return Promise.all(ids.map(id => fetchNews(id) as unknown as Promise<Comment>));
};
