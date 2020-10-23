/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './helper';

import Homepage from './components/Sections/root/index';
import AdminPanel from './components/Sections/admin/index';
import Shop from './components/Sections/shop/index';
import ShopSearch from './components/Sections/searchpage/index';
import Cart from './components/Sections/cart';
import LocationContext from './LocationContext';

export default function HomePage() {
  const [location, setLocation] = React.useState(null);
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('location services not available');
    }
  }, []);
  console.log(location);
  return (
    <Switch>
      <AuthProvider>
        <LocationContext.Provider
          value={{
            loc: location,
          }}
        >
          <Route exact path="/" component={Homepage} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/shop" component={Shop} />
          <Route path="/search" component={ShopSearch} />
          <Route path="/cart" component={Cart} />
        </LocationContext.Provider>
      </AuthProvider>
    </Switch>
  );
}
