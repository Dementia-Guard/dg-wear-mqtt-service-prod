import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import envConfig from './envConfig.js';

const firebaseConfig = envConfig.firebase;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dbRealtime = getDatabase(app);
export const dbFirestore = getFirestore(app);
