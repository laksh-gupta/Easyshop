const blake2b = require('blakejs').blake2bHex;
require('dotenv').config;
const db = require('../models/firebaseSDK').db;
const jwt = require('jsonwebtoken');
const check = require('../helpers/check');

const restruct = async (stores, callback) => {
  const a = stores.map((store) => store.products);
  const b = a.flat(1);
  return callback(b);
};

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
    const { query } = req.body;
    // const query = 'dabur honey';
    console.log(query);
    const users = db.collection('users');
    const usersSnapshot = await users.get();
    var stores = [];
    usersSnapshot.forEach((user) => {
      stores.push(user.data());
    });
    // console.log(stores);

    var filtered = stores.map((store) => {
      var a = store.products.filter((product) => {
        return check(product, query);
      });
      if (a.length > 0)
        return {
          products: a.map((item) => {
            return Object.assign(item, {
              shopname: store.name,
              latitude: store.latitude,
              longitude: store.longitude,
            });
          }),
        };
    });

    var newFiltered = filtered.filter((item) => {
      return item;
    });
    restruct(newFiltered, (structured) => {
      console.log(structured);
      res.send(structured);
    });
  },
};
