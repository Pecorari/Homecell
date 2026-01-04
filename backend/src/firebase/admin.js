const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "homecell-firebase.firebasestorage.app"
});

module.exports = admin;
