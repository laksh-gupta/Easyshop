import React from 'react';
import { Container } from '@material-ui/core';

export default function Map({ lat, lon }) {
  return (
    <Container style={{ marginLeft: '10vw' }}>
      <iframe
        style={{ borderRadius: '20px' }}
        height={350}
        width={350}
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyB387HYMPGb934bjW6nWNDt7jT6QhUmBTw&center=${lat},${lon}&zoom=18&maptype=satellite`}
      ></iframe>
    </Container>
  );
}
