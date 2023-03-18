import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection as firestoreCollection,
  doc as firestoreDoc,
  where,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collection = (path: string, ...pathSegments: string[]) =>
  firestoreCollection(db, path, ...pathSegments);
const doc = (path: string, ...pathSegments: string[]) => firestoreDoc(db, path, ...pathSegments);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  const q = query(collection('users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await setDoc(doc('users', user.uid), {
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    });
  }
};
const logInWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await signInWithEmailAndPassword(auth, email, password);
};
const registerWithEmailAndPassword = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await setDoc(doc('users', user.uid), {
    name,
    authProvider: 'local',
    email,
  });
};
const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
const logout = async () => {
  await signOut(auth);
};

export interface User {
  email: string;
  authProvider: string;
  name: string;
  id: string;
}

export {
  auth,
  collection,
  doc,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
