import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';
// react components for routing our app without refresh
// core components
import Button from '../../../../utils/CustomButtons/Button.js';

import styles from '../../../../utils/assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank" className={classes.navLink}>
          <ShoppingCartIcon className={classes.icons} /> Add Product
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank" className={classes.navLink}>
          <ShoppingCartIcon className={classes.icons} /> LogOut
        </Button>
      </ListItem>
    </List>
  );
}
