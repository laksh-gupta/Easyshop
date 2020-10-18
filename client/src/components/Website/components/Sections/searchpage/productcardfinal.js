import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ProductCard = ({ product, shopname }) => {
  return (
    <TableRow>
      <TableCell>
        <img height="150px" width="150px" src={product.image_link} />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell> {shopname} </TableCell>
      <TableCell> {product.price} </TableCell>
    </TableRow>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
