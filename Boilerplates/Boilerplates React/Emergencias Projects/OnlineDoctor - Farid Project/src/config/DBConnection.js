import * as Firebase from 'firebase';
import "firebase/auth";

var config = {
  apiKey: "AIzaSyAGQ-AMCmpkcgErO2UVW0b_BFcFFHTCAJw",
  authDomain: "uma-v2.firebaseapp.com",
  databaseURL: "https://uma-v2.firebaseio.com",
  projectId: "uma-v2",
  storageBucket: "uma-v2.appspot.com",
  messagingSenderId: "320149797683",
  appId: "1:320149797683:web:6cb56009aaa69a3dc9dc46"
};

function DBConnection() {
  Firebase.initializeApp(config);
  return Firebase;
}

export default DBConnection();

export function messaging() {
  let msg
  Firebase.initializeApp(config);
  // we need to check if messaging is supported by the browser
  if(Firebase.messaging.isSupported()) {
      msg = Firebase.messaging();
  }
  console.log(msg)
}

