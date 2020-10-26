import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
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

const ProductCard = ({ product, shopname, lat, lon }) => {
  const { loc } = React.useContext(LocationContext);
  var cart = Cookies.getJSON('cart');
  const submit = (e) => {
    e.preventDefault();
    cart.cart.push({
      name: product.name,
      image_link: product.image_link,
      price: product.price,
      longitude: lon,
      latitude: lat,
      shop: shopname,
    });
    console.log(cart);
    Cookies.set('cart', cart);
  };
  console.log('lat', lat, 'lon', lon, loc);
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
        {' '}
        {(distance(lat, lon, loc.latitude, loc.longitude) * 1.2).toFixed(
          2
        )} KM{' '}
      </TableCell>
      <TableCell>
        {product.quantity < 10 ? (
          <div style={{ color: 'red' }}>Less than 10 left</div>
        ) : (
          <div style={{ color: 'green' }}>Available</div>
        )}
      </TableCell>
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
