import { ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { dbRealtime, dbFirestore } from '../Config/firebaseConfig.js';

// Save data to Firebase Realtime Database
export const saveToRealtimeDB = async (deviceId, timestamp, data) => {
    const realtimeDbRef = ref(dbRealtime, `sensorData/${deviceId}`);
    await set(realtimeDbRef, { receivedAt: timestamp, data });
    // console.log('Data updated to Realtime Database.');
};

// Save data to Firestore
export const saveToFirestore = async (timestamp, data) => {
    const firestoreDocRef = doc(dbFirestore, `sensorData/${timestamp}`);
    await setDoc(firestoreDocRef, { receivedAt: timestamp, data });
    console.log('Data saved to Firestore.');
};
