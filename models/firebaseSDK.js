var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(
    require('./easyshop-ace15-firebase-adminsdk-8mf6o-eecaae794d.json')
  ),
});

module.exports = {
  db: admin.firestore(),
};
