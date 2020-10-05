const blake2b = require('blakejs').blake2bHex;
require('dotenv').config;
const db = require('../models/firebaseSDK').db;
const jwt = require('jsonwebtoken');
const check = require('../helpers/check');
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
          productSnapshot.get().then(async (products) => {
            const data = await products.docs.filter(async (product) => {
              // const productData = product.data();
              return await check(product.data(), query).then((isValid) => {
                return isValid;
              });
              // console.log(typeof a);
              // return a;
              // return await check(product.data(), query).then((d) => d);
            });
            console.log(data.length);

            // products.forEach(async (product) => {});
          });
        });
      })
      .catch((err) => {
        res.send('err');
      });
    // console.log(sending_data);
    res.send(sending_data);
  },
};
