import React from 'react';
import axios from 'axios';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LandingPage from '../../LandingPage';
import ProductCard from './productcardfinal';
import Page from './Page';
import Loading from '../../../Loading';
import { useLocation } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

var data = [
  {
    name: 'allmart',
    products: [
      {
        image_link:
          'https://images-na.ssl-images-amazon.com/images/I/71s9FMKzr%2BL._SL1500_.jpg',
        name: 'Headphones',
        price: '200',
        quantity: '200',
      },
      {
        image_link:
          'https://images-na.ssl-images-amazon.com/images/I/71s9FMKzr%2BL._SL1500_.jpg',
        name: 'Headphones',
        price: '200',
        quantity: '200',
      },
    ],
  },
];

export default function ShopSearch(props) {
  const [products, setProducts] = React.useState(data);
  const query = new URLSearchParams(useLocation().search).get('q');
  //   console.log(new URLSearchParams(useLocation().search).get('q'));
  React.useEffect(() => {
    axios
      .post('http://localhost:5000/query', {
        query: query,
      })
      .then((res_) => {
        setProducts(res_.data);
      });
  }, []);
  console.log(products);
  return products ? (
    <LandingPage>
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
              {products.map((product) => {
                return product.products.map((prod) => {
                  return <ProductCard shopname={product.name} product={prod} />;
                });
              })}
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
    </LandingPage>
  ) : (
    <Loading />
  );
}
