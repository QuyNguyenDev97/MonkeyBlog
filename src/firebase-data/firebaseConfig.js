import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD7u3qKrXS76SKgXCTZhuTWrKKtMYAsX9Q",
  authDomain: "monkeyblogging-120b1.firebaseapp.com",
  projectId: "monkeyblogging-120b1",
  storageBucket: "monkeyblogging-120b1.appspot.com",
  messagingSenderId: "274507158319",
  appId: "1:274507158319:web:93a2dbb4aa56418b2347da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
