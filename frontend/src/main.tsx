import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PassportProvider } from './passport';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PassportProvider>
        <App />
      </PassportProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
