import React from 'react';
import { Container } from '@material-ui/core';

export default function Map(props) {
  return (
    <Container style={{ marginLeft: '10vw' }}>
      <iframe
        style={{ borderRadius: '20px' }}
        height={350}
        width={350}
        src={props.link}
      ></iframe>
    </Container>
  );
}
