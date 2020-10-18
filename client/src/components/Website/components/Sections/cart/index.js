import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CartContext from '../../../CartContext';
import LandingPage from '../../LandingPage';
import { Button } from '@material-ui/core';

export default function Cart(props) {
  const { cart, updateCart } = React.useContext(CartContext);

  const remove = (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    const cart_ = cart.filter((item) => {
      return item.name !== name.value;
    });
    console.log(cart_);
    updateCart(cart_);
  };
  return (
    <LandingPage>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => {
              return (
                <TableRow>
                  <TableCell>
                    <img height="150px" width="150px" src={item.image_link} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell> {item.shop} </TableCell>
                  <TableCell> {item.price} </TableCell>
                  <TableCell>
                    <form onSubmit={remove}>
                      <input name="name" hidden value={item.name} />
                      <Button type="submit">Remove</Button>
                    </form>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </LandingPage>
  );
}
