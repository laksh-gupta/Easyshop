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
      console.log(a);
      return {
        name: store.name,
        products: a,
      };
    });
    console.log(filtered);
    // Promise.all(promises).then(() => {
    //   // var promises_ =
    //   promises.forEach((products) => {
    //     products.then((prods) => {
    //       prods.docs.forEach((doc) => {
    //         var innerPromises = [];
    //         const productData = product.data();
    //         promises.push(
    //           check(productData, query).then((isValid) => {
    //             if (isValid) {
    //               sending_data.push(productData);
    //             }
    //           })
    //         );
    //       });
    //     });
    //   });
    // });
    // await new Promise(async (resolve, reject) => {
    //   // const usersSnapshot = await users.get();
    //   var promises = [];
    //   // usersSnapshot.forEach(user => {

    //   // })
    //   usersSnapshot
    //     .get()
    //     .then(async (users) => {
    //       users.forEach(async (user) => {
    //         const productSnapshot = await usersSnapshot
    //           .doc(user.id)
    //           .collection('products');
    //         await productSnapshot.get().then(async (products) => {
    //           products.docs.forEach(async (product) => {
    //             const productData = product.data();
    //             promises.push(
    //               check(productData, query).then((isValid) => {
    //                 if (isValid) {
    //                   sending_data.push(productData);
    //                 }
    //               })
    //             );
    //           });
    //         });
    //       });
    //     })
    //     .catch((err) => {
    //       res.send('err');
    //     });
    //   Promise.all(promises).then(() => resolve());
    // });
    // console.log(sending_data);
    res.send(filtered);
  },
};
