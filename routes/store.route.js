const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;
const store = require('../controllers/store.controller');
const verifyJWT = require('../helpers/verifyJWT');
const decryptionVerification = require('../helpers/decryptionVerification');

router.get('/', verifyJWT, store.getInventory);
router.get('/:id', store.getProducts);
router.post(
  '/update',
  verifyJWT,
  decryptionVerification,
  store.updateInventory
);
router.post(
  '/addinventory',
  verifyJWT,
  decryptionVerification,
  store.addInventory
);

module.exports = router;
