import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../helper';
import Button from '@material-ui/core/Button';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LandingPage from '../../LandingPage';

import Page from './page.js';
import data from './data.js';
import ProductCard from './productcard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
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
  const classes1 = useStyles2();
  const [products, setProducts] = React.useState(data);
  var [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setProducts((products) => [...products]);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                add prodcut to your inventory
              </Typography>
              <form className={classes1.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Category"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Price"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="quantity"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Description"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="image Link"
                      type="password"
                      id="password"
                      autoComplete="current-password"
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
                  Save the item
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Add another product
                    </Link>
                  </Grid>
                </Grid>
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
          {/* <Toolbar /> */}
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
