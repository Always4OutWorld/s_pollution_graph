import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App';
import reducers from './redux/reducer';
import intialValue from './redux/initalValue';

const store = createStore(
  intialValue,
  reducers,
  ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__)|| compose)(applyMiddleware(thunk))
);

const APP_ROUTE = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(<APP_ROUTE />, document.getElementById('app_container'));
