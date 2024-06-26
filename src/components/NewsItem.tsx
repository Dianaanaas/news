import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NewsItem.module.css';
import { NewsItem as NewsItemType } from '../types';

type NewsItemProps = {
  newsItem: NewsItemType;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

const NewsItem: React.FC<NewsItemProps> = ({ newsItem, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.newsItem}>
      <h2 onClick={() => navigate(`/news/${newsItem.id}`)} className={styles.title}>{newsItem.title}</h2>
      <p>By: {newsItem.by}</p>
      <p>Score: {newsItem.score}</p>
      <div >
      <button onClick={() => onToggleFavorite(newsItem.id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      {newsItem.kids && (
        <button onClick={() => navigate(`/news/${newsItem.id}`)} className={styles.commentsButton}>
          {newsItem.kids.length} Comments
        </button>
      )}
      </div>
    </div>
  );
};

export default NewsItem;
