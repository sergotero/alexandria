import './index.css';       
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { LibraryContextProvider } from './components/context';
import worker from './mock/browser.js';
import App from './App.jsx';

worker.start({ onUnhandledRequest: "bypass"})
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <Router>
          <LibraryContextProvider>
            <App />
          </LibraryContextProvider>
        </Router>
      </StrictMode>,
    );
  })
  .catch((error) => console.error(error));
