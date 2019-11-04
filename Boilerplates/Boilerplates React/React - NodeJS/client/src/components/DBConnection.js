
import * as Firebase from 'firebase';

function DBConnection() {

  var config = {
    apiKey: "AIzaSyAGQ-AMCmpkcgErO2UVW0b_BFcFFHTCAJw",
    authDomain: "uma-v2.firebaseapp.com",
    databaseURL: "https://uma-v2.firebaseio.com",
    projectId: "uma-v2",
    storageBucket: "uma-v2.appspot.com",
    messagingSenderId: "320149797683"
  };

  Firebase.initializeApp(config);

  return Firebase;
}

export default DBConnection();
