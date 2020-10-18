const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;
const store = require('../controllers/store.controller');

router.get('/:id', store.getProducts);

module.exports = router;
