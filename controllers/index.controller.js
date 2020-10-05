const blake2b = require('blakejs').blake2bHex;
require('dotenv').config;
const db = require('../models/firebaseSDK').db;
const jwt = require('jsonwebtoken');
const { use } = require('../routes/index.route');

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    db.collection('users')
      .doc(blake2b(email).slice(0, 10))
      .get()
      .then((data) => {
        const res_ = data.data();
        // console.log(res_)
        if (blake2b(password) === res_.password) {
          // console.log('success')
          jwt.sign(
            {
              data: {
                name: res_.name,
                uid: res_.uid,
                email: res_.email,
              },
            },
            process.env.JWT_SECRET,
            (err, token) => {
              if (err) {
                console.log(err);
                return res.status(503).send(new Error('error'));
              }
              return res.status(200).send(token);
            }
          );
        } else {
          res.status(400).send('invalidPass');
        }
      })
      .catch((err) => {
        res.status(503).send(new Error('error'));
      });
  },
  query: async (req, res) => {
    // const { query } = req.body;
    const query = 'dabur honey';
    var sending_data = [];
    const usersSnapshot = db.collection('users');
    await usersSnapshot
      .get()
      .then((users) => {
        users.forEach((user) => {
          const productSnapshot = usersSnapshot
            .doc(user.id)
            .collection('products');
          productSnapshot.get().then((products) => {
            products.forEach((product) => {
              const prodName = product.data().name.toLowerCase();
              console.log(prodName);
              const query_ = query.split(' ');
              console.log(query_);
              const data = query_.filter((word) => {
                if (prodName.includes(word)) {
                  return word;
                }
              });
              console.log(data);
              // if (data.length == query_.length) {
              sending_data.push(product.data());
              // }
            });
          });
        });
      })
      .catch((err) => {
        res.send('err');
      });
    res.send(sending_data);
  },
};
