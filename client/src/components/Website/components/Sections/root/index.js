import React from 'react';
import LandingPage from '../../LandingPage';

import TopPicks from './dispplay';
import ProfilePage from './bestproduct';
import ProductCategories from './ShopSection';

export default function Homepage() {
  return (
    <LandingPage>
      <TopPicks />
      <ProductCategories />
      <ProfilePage />
    </LandingPage>
  );
}
