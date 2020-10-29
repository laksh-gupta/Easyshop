import React from 'react';
import axios from 'axios';
import server from '../../../../../config';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { grayColor } from '../../../../utils/assets/jss/dispplay-react';
import { AuthContext } from '../../../helper';
import encrypt_ from '../../../../../helpers/jsonEncrypt';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainRaised: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  mainButton: {
    padding: '4px 4px 4px 4px',
    margin: '0px 1.0vw 0px',
    borderRadius: '6px',
    border: '2px solid grey',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  plusminus: {
    fontSize: '20px',
  },
  modify: {
    fontWeight: '50',
    color: grayColor[1],
    margin: '0',
    fontSize: '30px',
    marginTop: '3px',
    marginBottom: '3px',
    fontFamily: 'Helvetica',
  },
  wide: {
    margin: '5px',
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  const submit1 = (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    console.log(name.value);
    axios
      .post(
        server + '/store/update',
        {
          payload: encrypt_({
            prod: name.value,
            operation: 1,
          }),
        },
        {
          headers: {
            authorization: currentUser,
          },
        }
      )
      .then((res_) => {
        if (res_.data === 'success') {
          alert('updated');
          window.location.href = '/admin';
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error Occured');
      });
  };

  const submit2 = (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    axios
      .post(
        server + '/store/update',
        {
          payload: encrypt_({
            prod: name.value,
            operation: -1,
          }),
        },
        {
          headers: {
            authorization: currentUser,
          },
        }
      )
      .then((res_) => {
        if (res_.data === 'success') {
          alert('updated');
          window.location.href = '/admin';
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error Occured');
      });
  };
  return (
    <Card className={clsx(classes.root, classes.mainRaised)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.modify}
          mb={3}
        >
          <img
            alt={product.name}
            width="100px"
            height="100px"
            src={product.image_link}
          />
        </Box>

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          className={classes.modify}
        >
          {product.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.name}
        </Typography>
      </CardContent>
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <form onSubmit={submit1}>
              <input readOnly name="name" value={product.name} hidden />
              <Button type="submit" variant="contained" color="primary">
                <Typography color="grey" display="inline" variant="body2">
                  +1
                </Typography>
              </Button>
            </form>
            <form onSubmit={submit2}>
              <input readOnly name="name" value={product.name} hidden />
              <Button type="submit" variant="contained" color="primary">
                <Typography color="grey" display="inline" variant="body2">
                  -1
                </Typography>
              </Button>
            </form>
          </Grid>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} color="action" />
            <Typography color="grey" display="inline" variant="body2">
              {product.quantity} available
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
