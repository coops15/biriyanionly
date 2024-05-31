// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSNSMOvHUhcae8MPbu3P0CoSzJzuwbqD0",
  authDomain: "biriyani-only.firebaseapp.com",
  projectId: "biriyani-only",
  storageBucket: "biriyani-only.appspot.com",
  messagingSenderId: "349021949821",
  appId: "1:349021949821:web:f0804c1f440752434e4614",
  measurementId: "G-YQNSZKSKD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
