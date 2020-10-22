import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import CartContext from '../../../CartContext';

const ProductCard = ({ product, shopname }) => {
  // const { cart, updateCart } = React.useContext(CartContext);
  var cart = Cookies.getJSON('cart');
  const submit = (e) => {
    e.preventDefault();
    cart.cart.push({
      name: product.name,
      image_link: product.image_link,
      price: product.price,
      shop: shopname,
    });
    console.log(cart);
    Cookies.set('cart', cart);
  };
  return (
    <TableRow>
      <TableCell>
        <img
          alt={product.name}
          height="150px"
          width="150px"
          src={product.image_link}
        />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell> {shopname} </TableCell>
      <TableCell> {product.price} </TableCell>
      <TableCell>
        <form onSubmit={submit}>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </TableCell>
    </TableRow>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
