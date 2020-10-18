import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

  const pdf = () => {
    var doc = new jsPDF();
    const tableColumn = ['Name', 'Price', 'Shop', 'Address'];
    const tableRows = cart.map((item) => {
      return [item.name, item.price, item.shop, 'lol'];
    });

    doc.autoTable({
      startY: 20,
      columns: tableColumn,
      body: tableRows,
    });
    doc.save('list.pdf');
  };

  return (
    <LandingPage>
      <div id="cart">
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
        <Button onClick={pdf}>Download pdf</Button>
      </div>
    </LandingPage>
  );
}
