import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

import store from './store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  </Provider>
);

export default App;
