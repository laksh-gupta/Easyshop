import React from 'react';
import axios from 'axios';
import server from '../../../../../config';

import LandingPage from '../../LandingPage';
import ProductCard from './productcardfinal';
import Loading from '../../../Loading';
import { useLocation } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

export default function ShopSearch(props) {
  const [products, setProducts] = React.useState([]);
  const query = new URLSearchParams(useLocation().search).get('q');
  // eslint-disable-next-line
  React.useEffect(() => {
    axios
      .post(server + '/query', {
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
                <TableCell>Add to Cart</TableCell>
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
