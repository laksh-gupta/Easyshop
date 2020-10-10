import React from 'react';

const CartContext = React.createContext({
  cart: {},
  updateCart: () => {},
});

export default CartContext;
