const db = require('../models/firebaseSDK').db;

module.exports = {
  getProducts: (req, res) => {
    const storeid = req.params.id;
    db.collection('users')
      .doc(storeid)
      .get()
      .then((data) => {
        res.status(200).send(data.data());
      });
  },
};
