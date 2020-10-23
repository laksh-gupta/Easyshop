const db = require('./models/firebaseSDK').db;
const blake2b = require('blakejs').blake2bHex;
const populate = require('./Dataset/shreeramsta.json');

const uid = blake2b(populate.email).slice(0, 10);
populate['uid'] = uid;
delete populate.plaintext_password;
populate.products.forEach((prod) => {
  prod['quantity'] = Math.floor(Math.random() * Math.floor(100));
});
console.log(populate);

db.collection('users')
  .doc(uid)
  .set(populate)
  .then(() => {
    console.log('success');
  });
