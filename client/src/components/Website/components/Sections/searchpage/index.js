import React, { useCallback } from 'react';
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
import CustomDropdown from '../../../../utils/CustomDropdown/CustomDropdown';
import LocationContext from '../../../LocationContext';

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distance(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export default function ShopSearch() {
  const { loc } = React.useContext(LocationContext);
  const [products, setProducts] = React.useState([]);
  const query = new URLSearchParams(useLocation().search).get('q');
  // eslint-disable-next-line
  React.useEffect(() => {
    axios
      .post(server + '/query', {
        query: query,
      })
      .then(async (res_) => {
        console.log(res_.data);
        var new_res = res_.data.map((product) => {
          // var lat1 = product.latitude;
          // var lon1 = product.longitude;
          // const loc_ = loc();
          // console.log(loc_);
          // product['distance'] = distance(
          //   lat1,
          //   lon1,
          //   loc_.latitude,
          //   loc_.longitude
          // ).toFixed(2);
          // // console.log(loc);
          // console.log('new', product);
          return product;
        });
        setProducts(new_res);
      });
  }, []);

  const sortSearch = (e) => {
    if (e.target.id === 'distance') {
      var a = products
        .sort((a, b) => {
          return distance(
            a.latitude,
            a.longitude,
            loc.latitude,
            loc.longitude
          ) >= distance(b.latitude, b.longitude, loc.latitude, loc.longitude)
            ? 1
            : -1;
        })
        .map((item) => item);
      setProducts(a);
      return;
    }
    var a = products
      .sort((a, b) => {
        return a[e.target.id] >= b[e.target.id] ? 1 : -1;
      })
      .map((item) => item);
    setProducts(a);
  };
  // console.log(products);
  // console.log(loc);
  return products ? (
    <LandingPage>
      <Grid container>
        <Grid item xs={12}>
          <CustomDropdown
            left
            caret
            hoverColor="black"
            buttonText={'Sort'}
            buttonProps={{
              color: 'primary',
            }}
            dropdownList={[
              <div id="name" onClick={sortSearch}>
                By Name
              </div>,
              <div id="price" onClick={sortSearch}>
                By Price
              </div>,
              <div id="distance" onClick={sortSearch}>
                By Distance
              </div>,
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Approx Distance</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Add to Cart</TableCell>
                </TableRow>
                {products.map((product) => {
                  return <ProductCard product={product} />;
                })}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </LandingPage>
  ) : (
    <Loading />
  );
}
