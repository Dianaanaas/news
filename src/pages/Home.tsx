import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchNewsIds, fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import SortSelector from '../components/SortSelector';
import Loader from '../components/Loader';
import styles from '../styles/NewsList.module.css';
import { NewsItem, NewsType } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [newsIds, setNewsIds] = useState<number[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<NewsType>('top');
  const [loading, setLoading] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchNewsIdsList = useCallback(async () => {
    setLoading(true);
    const ids = await fetchNewsIds(sortBy);
    setNewsIds(ids);
    setNews([]);
    setPage(1);
    setLoading(false);
  }, [sortBy]);

  const loadNews = useCallback(async () => {
    setLoading(true);
    const start = (page - 1) * 15;
    const end = start + 15;
    const news = await Promise.all(newsIds.slice(start, end).map(fetchNews));
    setNews((prev) => [...prev, ...news]);
    setLoading(false);
  }, [newsIds, page]);

  useEffect(() => {
    fetchNewsIdsList();
  }, [fetchNewsIdsList]);

  useEffect(() => {
    if (newsIds.length) loadNews();
  }, [newsIds, page, loadNews]);

  useEffect(() => {
    const intervalId = setInterval(fetchNewsIdsList, 30000);
    return () => clearInterval(intervalId);
  }, [fetchNewsIdsList]);

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <div className={styles.newsFeed}>
      <div className={styles.buttonGroup}>
        <SortSelector selectedSort={sortBy} onChange={setSortBy} />
        <button className={styles.button} onClick={fetchNewsIdsList}>Refresh</button>
        <Link to="/favorites" className={styles.button}>Favorites</Link>
      </div>
      <NewsList news={news} favorites={favorites} onToggleFavorite={handleToggleFavorite} loading={loading} />
      <div ref={loader} className={styles.loaderContainer}>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Home;
