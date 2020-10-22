const express = require('express');
const path = require('path');
const cors = require('cors');
var RateLimit = require('express-rate-limit');
const morgan = require('morgan');
// const ddos = require('./helpers/ddosHandler');
// const decrypt_ = require('./helpers/rsaDecrypt').decrypt_;
// const mongoose = require('mongoose');

const app = express();
// const mongoURL = "mongodb://127.0.0.1:27017/test";
const index = require('./routes/index.route');
const store = require('./routes/store.route');
// const users = require('./routes/users.routes');
const verifyJWT = require('./helpers/verifyJWT');

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan('combined'));
// app.use(ddos);
app.enable('trust proxy');

var limiter = new RateLimit({
  windowMs: 6000,
  max: 100,
  delayMs: 0,
});

app.use(limiter);

// app.use('/users', users);
app.use('/', index);
app.use('/store', store);
app.get('/test', (req, res) => {
  res.send('success');
});

app.post('/check', verifyJWT, (req, res) => {
  // const { payload } = req.body;
  res.send(req.body);
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Listening on port ${port}`);
  }
});

module.exports = app;
