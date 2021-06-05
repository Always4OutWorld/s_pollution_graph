import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';

const APP_ROUTE = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
ReactDOM.render(<APP_ROUTE />, document.getElementById('app_container'));
