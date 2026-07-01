import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  type Auth,
} from 'firebase/auth';
// @ts-ignore Firebase React Native persistence exists at runtime, but TypeScript may not see it.
import { getReactNativePersistence } from 'firebase/auth';
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

let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
export default app;