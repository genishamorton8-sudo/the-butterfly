import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRK6ndEj1czytbSgJgNA1QgUJn_-135MM',
  authDomain: 'the-butterfly-90907.firebaseapp.com',
  projectId: 'the-butterfly-90907',
  storageBucket: 'the-butterfly-90907.firebasestorage.app',
  messagingSenderId: '12060392528',
  appId: '1:12060392528:web:620315c994baead4942555',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;