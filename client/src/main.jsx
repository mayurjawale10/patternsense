// React entry point.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  document.body.innerHTML = '<p style="padding:24px;font-family:sans-serif">Root element #root not found.</p>';
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
