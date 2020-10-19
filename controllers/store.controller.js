const db = require('../models/firebaseSDK').db;

module.exports = {
  getInventory: async (req, res) => {
    const uid = req.authorizedUser.data.uid;
    db.collection('users')
      .doc(uid)
      .get()
      .then((data) => {
        res.status(200).send(data.data().products);
      })
      .catch((err) => {
        console.log(err);
        res.status(503).send('Error');
      });
  },
  getProducts: async (req, res) => {
    const storeid = req.params.id;
    await db
      .collection('users')
      .doc(storeid)
      .get()
      .then((data) => {
        res.status(200).send(data.data());
      });
  },
  updateInventory: async (req, res) => {
    const uid = req.authorizedUser.data.uid;
    const { prod, operation } = req.body;
    console.log(req.body, prod, operation);
    var prods = await db
      .collection('users')
      .doc(uid)
      .get()
      .then((data) => data.data().products);
    var newProds = prods.map((product) => {
      if (product.name === prod) {
        var a = product;
        a['quantity'] = product['quantity'] + operation;
        return a;
      }
      return product;
    });

    await db.collection('users').doc(uid).set(
      {
        products: newProds,
      },
      {
        merge: true,
      }
    );
    res.status(200).send('success');
  },
};
