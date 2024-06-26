import React from 'react';
import styles from '../styles/NewsList.module.css';

type SortSelectorProps = {
  selectedSort: 'best' | 'top' | 'new';
  onChange: (sort: 'best' | 'top' | 'new') => void;
};

const SortSelector: React.FC<SortSelectorProps> = ({ selectedSort, onChange }) => {
  return (
    <div>
      <button className={styles.button} onClick={() => onChange('best')} disabled={selectedSort === 'best'}>Best</button>
      <button className={styles.button} onClick={() => onChange('top')} disabled={selectedSort === 'top'}>Top</button>
      <button className={styles.button} onClick={() => onChange('new')} disabled={selectedSort === 'new'}>New</button>
    </div>
  );
};

export default SortSelector;
