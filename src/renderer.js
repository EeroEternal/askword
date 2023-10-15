// import "../react/app.js";
//
import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from '../react/chat/entry.js';
import '../react/main.css';

;

// window.electronAPI.handleConfig((_event, value) => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Chat />
  // </React.StrictMode>
)
// })
