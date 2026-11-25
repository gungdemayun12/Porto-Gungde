/**
 * main.jsx — entry point aplikasi React
 * Import CSS dan mount ke DOM.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Ikon Font Awesome versi subset — hanya glyph yang dipakai (dibuat oleh
// `npm run icons`). Jauh lebih ringan daripada `all.min.css`.
import './styles/fontawesome-subset.css';
import './styles/index.css';
import './styles/enhancements.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
