const { route } = require('./index.route');

const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;

router.post('/query');
