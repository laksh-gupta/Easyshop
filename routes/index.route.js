const router = require('express').Router();
const decrypt_ = require('../helpers/rsaDecrypt').decrypt_;

// Import Controllers Here
const user = require('../controllers/users.controller');
const index = require('../controllers/index.controller');

//Index Route
// router.get('/', (req, res) => {
//   res.send('Index Route');
// });

// User Routes
router.post('/adduser', user.addUser);

//Login
router.post('/login', decrypt_, index.login);

//Get store on search string
router.post('/query', index.query);

module.exports = router;
