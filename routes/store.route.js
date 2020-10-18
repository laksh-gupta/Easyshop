const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;
const store = require('../controllers/store.controller');
const verifyJWT = require('../helpers/verifyJWT');

router.get('/:id', store.getProducts);

router.get('/', verifyJWT, store.getInventory);
router.put('/update', verifyJWT, store.updateInventory);

module.exports = router;
