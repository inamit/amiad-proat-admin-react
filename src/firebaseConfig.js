// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import {
  setPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDjGsgIDZ-v0ZtBB2Iq3efU7MMz26ajejo',
//   authDomain: 'amiad-porat-staging.firebaseapp.com',
//   projectId: 'amiad-porat-staging',
//   storageBucket: 'amiad-porat-staging.appspot.com',
//   messagingSenderId: '298508107993',
//   appId: '1:298508107993:web:9e862f71664b557a9bbec8',
//   measurementId: 'G-NKD0LLKV7Y'
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  console.log(firebaseConfig);
  console.log(
    'testing locally -- hitting local auth, firestore and functions emulators'
  );

  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8082);
}

setPersistence(auth, browserLocalPersistence);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    let errorMessage = '';

    switch (error.code) {
      case AuthErrorCodes.INVALID_EMAIL:
        errorMessage = '???? ?????????? ?????????? ???????? ??????????';
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
      case AuthErrorCodes.USER_DELETED:
        errorMessage = '??????????/?????????? ???? ????????????. ?????? ????????';
        break;
      case AuthErrorCodes.ADMIN_ONLY_OPERATION:
      default:
        errorMessage = '???????? ?????????? ???????? ??????????, ???? ???? ???????? ??????, ?????? ?????? ????????????.';
        break;
    }

    throw errorMessage;
  }
};

export const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const logout = () => {
  signOut(auth);
};
