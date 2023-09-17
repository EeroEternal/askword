import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './chat/layout.js';
import './main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>
);
