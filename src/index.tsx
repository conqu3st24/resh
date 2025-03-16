// Core imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './store';

// Components
import App from './App';

// Styles
import './index.css';

// Utilities
import reportWebVitals from './reportWebVitals';

/**
 * Main application root element
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Render the application with Redux provider
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals();
