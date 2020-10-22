let server;

export default server =
  process.env.NODE_ENV == 'production' ? '' : 'http://localhost:5000';
