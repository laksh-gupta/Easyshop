import React from 'react';
import axios from 'axios';
import server from '../../../../../config';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../helper';
import Button from '@material-ui/core/Button';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LandingPage from '../../LandingPage';

import Page from './page.js';
import ProductCard from './productcard';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import encrypt_ from '../../../../../helpers/jsonEncrypt';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: '100%',
  },
  mainRaised: {
    padding: '10px 10px 10px 0px',
    margin: '0px 1.9vw 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
}));
const useStyles2 = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
}));

export default function AdminPanel() {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const classes1 = useStyles2();
  var [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(server + '/store', {
        headers: {
          authorization: currentUser,
        },
      })
      .then((res_) => {
        setProducts((products) => products.concat(res_.data));
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const {
      category,
      name,
      price,
      quantity,
      description,
      image_link,
    } = e.target.elements;

    axios
      .post(
        server + '/store/addinventory',
        {
          payload: encrypt_({
            category: category.value,
            name: name.value,
            price: price.value,
            quantity: quantity.value,
            description: description.value,
            image_link: image_link.value,
          }),
        },
        {
          headers: {
            authorization: currentUser,
          },
        }
      )
      .then((res_) => {
        console.log(res_.data);
        if (res_.data === 'success') {
          alert('Product added successfully');
          window.location.reload();
        }
      });
  };
  return currentUser ? (
    <LandingPage>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
        style={{
          maxWidth: '300px',
          maxHeight: '50px',
          minWidth: '300px',
          minHeight: '50px',
          marginLeft: '45px',
          marginBottom: '20px',
        }}
        color="primary"
      >
        Add another product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes1.paper}>
              <Avatar className={classes1.avatar}>
                <AddShoppingCartIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add New Product
              </Typography>
              <form onSubmit={submit} className={classes1.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="category"
                      variant="outlined"
                      required
                      fullWidth
                      label="Category"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Name"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="price"
                      variant="outlined"
                      required
                      fullWidth
                      label="Price"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="quantity"
                      name="quantity"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Description"
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="image_link"
                      label="Image Link"
                      id="password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes1.submit}
                >
                  Add
                </Button>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <Page
        className={(classes.root, classes.mainRaised)}
        title="EasyShop - Admin"
      >
        <Container maxWidth={false}>
          <Box mt={3}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard
                    className={classes.productCard}
                    product={product}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box mt={3} display="flex" justifyContent="center"></Box>
        </Container>
      </Page>
    </LandingPage>
  ) : (
    <Redirect to="/" />
  );
}
