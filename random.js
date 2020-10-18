const db = require('./models/firebaseSDK').db;
const blake2b = require('blakejs').blake2bHex;
const populate = require('./Dataset/allmart.json');
// db.collection('users').get().then((docs) => {
//   docs.forEach((doc) => {
//     console.log(doc.data())
//   })
// })

const uid = blake2b(populate.email).slice(0, 10);
populate['uid'] = uid;
delete populate.plaintext_password;
populate.products.forEach((prod) => {
  prod['quantity'] = Math.floor(Math.random() * Math.floor(100));
});
// populate['quantity'] = Math.floor(Math.random() * Math.floor(100));
db.collection('users').doc(uid).set(populate);

// var a = () => {
//   return new Promise((resolve) => {
//     resolve(
//       [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 5].map((i, j) => {
//         return {
//           name: 'maggie',
//           price: '20',
//           image: '',
//         };
//       })
//     );
//   });
// };

// a().then((data) => {
//   console.log(data);
// });

// db.collection('users')
