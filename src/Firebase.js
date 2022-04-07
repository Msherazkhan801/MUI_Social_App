import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB57C_uaUmcfeVMAERvOPF2vWGPpaIdSXI",
  authDomain: "socialapp-15330.firebaseapp.com",
  projectId: "socialapp-15330",
  storageBucket: "socialapp-15330.appspot.com",
  messagingSenderId: "764051822906",
  appId: "1:764051822906:web:b597783e99355906735803",
  measurementId: "G-JH4MCS2G96"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbstorage =getStorage (app);
