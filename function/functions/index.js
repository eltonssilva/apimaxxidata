const functions = require("firebase-functions");
const admin = require('firebase-admin');

var firebaseConfig = {
  apiKey: "AIzaSyDcBilkZ2e8d-yLGaO2n4tIKHa2iiLaB1I",
  authDomain: "maxxidata-9661f.firebaseapp.com",
  databaseURL: "https://maxxidata-9661f-default-rtdb.firebaseio.com",
  projectId: "maxxidata-9661f",
  storageBucket: "maxxidata-9661f.appspot.com",
  messagingSenderId: "46904567627",
  appId: "1:46904567627:web:0059b039c1bd023bafaace"
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);


module.exports = {
  ...require("./contatos"),
  ...require("./usuarios"),
  ...require("./empresa"),
};





  // var config = {
  //   apiKey: "AIzaSyDcBilkZ2e8d-yLGaO2n4tIKHa2iiLaB1I",
  //   authDomain: "maxxidata-9661f.firebaseapp.com",
  // };
  // firebase.initializeApp(config);

