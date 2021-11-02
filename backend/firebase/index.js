import firebase from "firebase-admin";

var serviceAccount = require("../config/fbServiceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
export default firebase;

