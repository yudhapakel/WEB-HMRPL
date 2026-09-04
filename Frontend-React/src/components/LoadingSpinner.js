import React from 'react';
import './LoadingSpinner.css';

/**
 * Spinner loading reuseable — dipakai buat ganti teks "Memuat..." polos.
 * Props: text (opsional), center (default true), height (padding vertikal).
 */
const LoadingSpinner = ({ text, height = 60 }) => (
  <div className="hmrpl-spinner-wrap" style={{ padding: `${height}px 16px` }}>
    <div className="hmrpl-spinner" aria-label="Memuat" role="status" />
    {text && <span className="hmrpl-spinner-text">{text}</span>}
  </div>
);

export default LoadingSpinner;