/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './helper';

import Homepage from './components/Sections/root/index';
import AdminPanel from './components/Sections/admin/index';
import Shop from './components/Sections/shop/index';
import ShopSearch from './components/Sections/searchpage/index';
import CartContext from './CartContext';
import Cart from './components/Sections/cart';

export default function HomePage() {
  const [cart, setCart] = React.useState([]);

  const updateCart = (newVal) => {
    setCart(newVal);
  };
  return (
    <Switch>
      <AuthProvider>
        <CartContext.Provider
          value={{
            cart: cart,
            updateCart: updateCart,
          }}
        >
          <Route exact path="/" component={Homepage} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/shop" component={Shop} />
          <Route path="/search" component={ShopSearch} />
          <Route path="/cart" component={Cart} />
        </CartContext.Provider>
      </AuthProvider>
    </Switch>
  );
}
