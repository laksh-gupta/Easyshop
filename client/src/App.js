import React from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from './components/Website/app';
var hist = createBrowserHistory();

function App() {
  React.useEffect(() => {
    var cart = { cart: [] };
    if (!Cookies.get('cart')) {
      Cookies.set('cart', cart);
    }
  }, []);
  return (
    <Router history={hist}>
      <HomePage />
    </Router>
  );
}

export default App;
