import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import Loader from '../components/Loader';
import { NewsItem } from '../types';
import styles from '../styles/NewsList.module.css';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const favoriteNews = await Promise.all(favorites.map(fetchNews));
      setNews(favoriteNews);
      setLoading(false);
    };

    loadFavorites();
  }, [favorites]);

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className={styles.newsFeed}>
      <div className={styles.buttonGroup}>
        <Link to="/" className={styles.button}>Go to home</Link>
      </div>
      <h1>My favorites</h1>
      <NewsList news={news} favorites={favorites} onToggleFavorite={handleToggleFavorite} loading={loading} />
      <div className={styles.loaderContainer}>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Favorites;
