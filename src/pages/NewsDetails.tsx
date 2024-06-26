import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchNews, fetchComments } from '../services/api';
import CommentList from '../components/CommentList';
import { NewsItem } from '../types';
import styles from '../styles/NewsDetails.module.css';

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const loadNewsItem = async () => {
      if (id) {
        const fetchedNewsItem = await fetchNews(parseInt(id));
        setNewsItem(fetchedNewsItem);
      }
    };
    loadNewsItem();
  }, [id]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.newsDetails}>
          <div className={styles.buttonGroup}>
        <Link to="/" className={styles.button}>Вернуться на главную</Link>
      </div>
      <h1>{newsItem.title}</h1>
      <p>By: {newsItem.by}</p>
      <p>Score: {newsItem.score}</p>
      <a href={newsItem.url} target="_blank" rel="noopener noreferrer">Read more</a>
      <h2>Comments</h2>
      {newsItem.kids ? <CommentList commentIds={newsItem.kids} /> : <p>No comments</p>}
    </div>
  );
};

export default NewsDetails;
