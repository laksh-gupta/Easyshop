import React from 'react';
import axios from 'axios';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LandingPage from '../../LandingPage';
import ProductCard from './productcardfinal';
import Page from './Page';
import Loading from '../../../Loading';
import { useLocation } from 'react-router-dom';


var data = [
  {
    name: "all marty",
    products: [
      {
        src:
          'https://images-na.ssl-images-amazon.com/images/I/71s9FMKzr%2BL._SL1500_.jpg',
        name: 'Headphones',
        subTitle: 'Sony',
        color: 'Red',
        price: '200',
      },
      {
        src:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM9C9aP58i8tP7Es4wi9Jp2ZQDsHowg3c0pw&usqp=CAU',
        name: 'iPad Pro',
        subTitle:
          'It’s a magical piece of glass.It’s so fast most PC laptops can’t catch up. It has pro cameras that can transform reality. And you can use it with touch, pencil, keyboard and now trackpad.It’s the new iPad Pro.',
        color: 'Gold',
        price: '600',
      },
    ]
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
        {products.map((product) => (
          <Grid item key={product.id} >
            <ProductCard
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </LandingPage>




  ) : (
      <Loading />
    );
}
