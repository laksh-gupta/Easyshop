const router = require('express').Router();

// Import Controllers Here
const user = require('../controllers/users.controller');
const verifyJWT = require('../helpers/verifyJWT');

//Index Route
router.get('/', verifyJWT, user.getInventory);

// User Routes
router.delete('/users', user.deleteUser);
router.put('/users', user.updateUser);

module.exports = router;
