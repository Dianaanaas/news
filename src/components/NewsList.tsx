import React from 'react';
import NewsItem from './NewsItem';
import { NewsItem as NewsItemType } from '../types';
import styles from '../styles/NewsList.module.css';

type NewsListProps = {
  news: NewsItemType[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  loading: boolean;
};

const NewsList: React.FC<NewsListProps> = ({ news, favorites, onToggleFavorite, loading }) => {
  return (
    <div className={styles.newsList}>
      {!loading && news.length === 0 && <p>No news available</p>}
      {news.map(item => (
        <NewsItem
          key={item.id}
          newsItem={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default NewsList;
