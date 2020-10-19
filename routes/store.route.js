const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;
const store = require('../controllers/store.controller');
const verifyJWT = require('../helpers/verifyJWT');

router.get('/', verifyJWT, store.getInventory);
router.get('/:id', store.getProducts);
router.post('/update', verifyJWT, decrypt_, store.updateInventory);

module.exports = router;
