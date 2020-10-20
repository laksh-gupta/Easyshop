import React from 'react';
import { render } from '@testing-library/react';

const App = () => {
  return <>EasyShop</>;
};

test('renders home page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/easyshop/i);
  expect(linkElement).toBeInTheDocument();
});
