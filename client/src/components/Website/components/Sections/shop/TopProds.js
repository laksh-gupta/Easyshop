import React from 'react';

import { Paper, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const useStyle = makeStyles({
  root: {
    margin: '0px 70px 70px 70px',
  },
});

export default function TopProds(props) {
  const classes = useStyle();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  return (
    <Paper className={classes.root} variant="outlined">
      <OwlCarousel
        className="owl-theme"
        loop
        autoplay={true}
        margin={10}
        nav={true}
        items={isDesktop ? 3 : 1}
        mouseDrag={true}
        touchDrag={true}
      >
        {props.top.map((link) => {
          return (
            <div>
              <img src={link.image_link} />
            </div>
          );
        })}
      </OwlCarousel>
    </Paper>
  );
}
