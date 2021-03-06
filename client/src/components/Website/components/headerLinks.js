/*eslint-disable*/
import React from 'react';
import { AuthContext } from '../helper';
import Cookies from 'js-cookie';
import encrypt_ from '../../../helpers/jsonEncrypt';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  List,
  ListItem,
  Dialog,
  TextField,
  DialogContent,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import Typography from './../../utils/assets/jss/material-kit-react/components/typography';
import CustomDropdown from './../../utils/CustomDropdown/CustomDropdown';
import server from '../../../config';
import styles from './../../utils/assets/jss/material-kit-react/components/headerLinksStyle.js';
import Loading from '../Loading';

const useStyles = makeStyles(styles);
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

const Auth = ({ history }) => {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles2();
  const classes1 = useStyles();
  var [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginOldSchool = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(server);
      axios
        .post(server + '/login', {
          payload: encrypt_({
            email: email.value,
            password: password.value,
          }),
        })
        .then((res) => {
          console.log(res.data);
          window.localStorage.setItem('session', JSON.stringify(res.data));
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured. Try after Some Time');
        });
    },
    [history]
  );

  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        color="transparent"
        target="_blank"
        className={classes1.navLink}
      >
        <SupervisorAccountIcon className={classes1.icons} /> Admin Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={handleLoginOldSchool}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Logged = () => {
  return (
    <CustomDropdown
      left
      caret
      hoverColor="black"
      buttonText={'Account'}
      buttonProps={{
        color: 'transparent',
      }}
      dropdownList={[
        <Link style={{ textDecoration: 'none' }} to="/admin" color="inherit">
          Admin Panel
        </Link>,
        <div
          onClick={async () => {
            window.localStorage.setItem('session', '');
            window.location.reload();
          }}
        >
          {' '}
          Sign Out{' '}
        </div>,
      ]}
    />
  );
};

const QuickCart = (props) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        {props.product.name}
      </Grid>
      <Grid item xs={4}>
        {props.product.shop}
      </Grid>
      <Grid item xs={4}>
        {props.product.price}
      </Grid>
    </Grid>
  );
};

const Quick = ({ cart }) => {
  return cart ? (
    <CustomDropdown
      left
      caret
      hoverColor="black"
      buttonIcon={ShoppingCartIcon}
      buttonText="Cart"
      buttonProps={{
        color: 'transparent',
      }}
      dropdownHeader={
        <Grid style={{ width: '20vw' }} container>
          <Grid item xs={4}>
            Name
          </Grid>
          <Grid item xs={4}>
            Shop
          </Grid>
          <Grid item xs={4}>
            Price
          </Grid>
        </Grid>
      }
      dropdownList={cart.cart
        .map((product) => {
          return <QuickCart product={product} />;
        })
        .concat(
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>View Detailed</Typography>
              </Grid>
              <Grid item xs={6}>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Link>
        )}
    />
  ) : (
    <Loading />
  );
};

export default function HeaderLinks() {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();

  const submit = (e) => {
    console.log(e.target.value);
    if (e.keyCode === 13) {
      window.location.href = `/search/?q=${e.target.value
        .split(' ')
        .join('+')}`;
    }
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <div className={(classes.search, classes.margin)}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onKeyDown={submit}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </ListItem>
      <ListItem className={classes.listItem}>
        <div className={(classes.search, classes.margin)}></div>
      </ListItem>

      <ListItem className={classes.listItem}>
        {currentUser ? <Logged /> : <Auth />}
      </ListItem>

      <ListItem className={classes.listItem}>
        <div className={(classes.search, classes.margin)}></div>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Quick cart={Cookies.getJSON('cart')} />
      </ListItem>
    </List>
  );
}
