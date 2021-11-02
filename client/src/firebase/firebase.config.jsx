import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDomONZWNAiumdkG1jwdTJfow1EwSbcInA",
  authDomain: "ecommerce-2021-cfb12.firebaseapp.com",
  projectId: "ecommerce-2021-cfb12",
  storageBucket: "ecommerce-2021-cfb12.appspot.com",
  messagingSenderId: "786437394368",
  appId: "1:786437394368:web:3fd356dc9b4e8fad580225",
  measurementId: "G-JXGB3CM6LP"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
// export const updatePass = updatePassword();
// export const sendSignInLinkToEmai = sendSignInLinkToEmail();