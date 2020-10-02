const { resolve } = require('path');

const db = require('./models/firebaseSDK').db;

const populate = require('./trialdata.json.json');
// db.collection('users').get().then((docs) => {
//   docs.forEach((doc) => {
//     console.log(doc.data())
//   })
// })

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
//   .get()
//   .then((data) => data.forEach((da) => console.log(da.id)));

populate.products.forEach((prod) =>
  db.collection('users').doc('e065f8a8a1').collection('products').add(prod)
);
