import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import Favorite from '@material-ui/icons/Favorite';
// core components

import GridContainer from '../../../../utils/Grid/GridContainer';
import GridItem from '../../../../utils/Grid/GridItem';
import NavPills from '../../../../utils/NavPills/NavPills';

import studio1 from '../../../../utils/assets/img/examples/studio-1.jpg';
import studio2 from '../../../../utils/assets/img/examples/studio-2.jpg';
import studio3 from '../../../../utils/assets/img/examples/studio-3.jpg';
import studio4 from '../../../../utils/assets/img/examples/studio-4.jpg';
import studio5 from '../../../../utils/assets/img/examples/studio-5.jpg';
import work1 from '../../../../utils/assets/img/examples/olu-eletu.jpg';
import work2 from '../../../../utils/assets/img/examples/clem-onojeghuo.jpg';
import work3 from '../../../../utils/assets/img/examples/cynthia-del-rio.jpg';
import work4 from '../../../../utils/assets/img/examples/mariya-georgieva.jpg';
import work5 from '../../../../utils/assets/img/examples/clem-onojegaw.jpg';

import styles from '../../../../utils/assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
            <NavPills
              alignCenter
              color="primary"
              tabs={[
                {
                  tabButton: 'Grocery',
                  tabIcon: Camera,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://cdn.dribbble.com/users/2833589/screenshots/7143294/media/88fca13b23cc3eeb0590f7c96f27e7e8.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://www.nutella.com/ca/sites/nutella_ca/files/2020-08/20fer6051_nutella_madeincanada_sustainable_commitments_1400x887_en_r1_v2.jpg?t=1599150591"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://www.nestle.in/sites/g/files/pydnoa451/files/styles/brand_carousel_banner/public/Nestea-Banner-01-04.jpg?h=92576ed1&itok=cWGF_N6P"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://cdn.shopify.com/s/files/1/0173/7644/4470/files/Mobile-banner_7f64e18f-4584-4852-b81d-cb99dbc73586.jpg?11882"
                          className={navImageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://www.madewithdelmonte.in/uploads/Del%20Monte%20All%20SKU%20Banner_1360x700_2.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://www.paramountfoils.com/wp-content/uploads/2019/05/main_kitchen-banner-aluminium-foil.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://5.imimg.com/data5/NP/BH/MY-13535572/nagpur-orange-500x500.jpg"
                          className={navImageClasses}
                        />
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabButton: 'self care',
                  tabIcon: Palette,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/1714_7-200x200.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/19572-200x200.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/5826_1-200x200.jpg"
                          className={navImageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/4785_3-200x200.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/5750_3-200x200.jpg"
                          className={navImageClasses}
                        />
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabButton: 'stationery',
                  tabIcon: Favorite,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://5.imimg.com/data5/HE/NQ/MY-15659747/uniball-click-gel-pen-500x500.jpg"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://3.imimg.com/data3/XI/LJ/MY-3668701/camlin-pencil-250x250.jpeg"
                          className={navImageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src="https://imgv2-2-f.scribdassets.com/img/document/324335633/149x198/bb0532d463/1595389160?v=1"
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKRMAgpXuGkRtQtxg1HWg_cTZVNVBuVCaquw&usqp=CAU"
                          className={navImageClasses}
                        />
                      </GridItem>
                    </GridContainer>
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
