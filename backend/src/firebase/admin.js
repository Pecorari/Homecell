const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'homecell-firebase.firebasestorage.app'
  });
}

module.exports = admin;
