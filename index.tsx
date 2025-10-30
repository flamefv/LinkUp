import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// The ThemeProvider is no longer needed.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Render the App component directly
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);