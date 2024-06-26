import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NewsDetails from './pages/NewsDetails';
import './styles/App.module.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/news/:id" element={<NewsDetails />} />
    </Routes>
  </Router>
);

export default App;
