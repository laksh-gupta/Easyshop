import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import server from '../../../../../config';
import Header from '../../../../utils/Header/Header.js';
import HeaderLinks from '../../headerLinks';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Loading from '../../../Loading.js';
import Parallax from '../../../../utils/Parallax/Parallax.js';

import Map from './maps';
import TopProds from './TopProds.js';

const useStyle = makeStyles({
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paginationAdjust: {
    alignContent: 'center',
    margin: '25px 25px 25px 46%',
  },
});

const ShopComp = (props) => {
  const classes = useStyle();
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (e, val) => {
    setPage(val);
  };
  React.useEffect(() => {
    axios.get(`${server}/store/${props.id}`).then((res_) => {
      setData(res_.data);
    });
  }, []);
  console.log(data);
  return data ? (
    <div>
      <Header
        color="secondary"
        brand="EasyShop"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: 'white',
        }}
      />
      <Parallax style={{ justifyContent: 'center' }} small image={''}>
        <Typography component="h1" variant="h2" align="center">
          {data.name}
        </Typography>
      </Parallax>
      <TopProds top={data['Top products']} />

      <Paper>
        <Container>
          <Grid container>
            {data.products.slice(page * 9 - 9, page * 9).map((prod, i) => {
              return (
                <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={prod.image_link}
                        title={prod.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {prod.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Typography>Price: {prod.price}</Typography>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid container>
            <Grid className={classes.paginationAdjust} item xs={12}>
              <Pagination
                onChange={handleChangePage}
                page={page}
                count={Math.ceil(data.products.length / 9)}
                color="primary"
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <div className={classes.main}>
        <Grid container>
          <Grid item sm={6}>
            <Map lat={data.latitude} lon={data.longitude} />
          </Grid>
          {/* <Grid style={{ padding: '40px' }} item sm={6}>
            <Typography>Name: All Maart</Typography>
            <Typography>
              Address: Gate 2, VIT, Vellore, Tamil Nadu - 632014
            </Typography>
            <Typography>Contact: +91 9090909090</Typography>
          </Grid> */}
        </Grid>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default function Shop() {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${url}/:id`}
        component={(props) => {
          return <ShopComp id={props.match.params.id} />;
        }}
      />
    </Switch>
  );
}
