import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXUVN1r2Whjf_iQGioFGHBXfeK6sWpA2k",
  authDomain: "projeto-firebase-ef126.firebaseapp.com",
  projectId: "projeto-firebase-ef126",
  storageBucket: "projeto-firebase-ef126.firebasestorage.app",
  messagingSenderId: "206068817206",
  appId: "1:206068817206:web:57f6529378071a45e22797"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };