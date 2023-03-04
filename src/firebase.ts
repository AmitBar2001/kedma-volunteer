import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const user = res.user
  const q = query(collection(db, 'users'), where('uid', '==', user.uid))
  const docs = await getDocs(q)
  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email
    })
  }
}
const logInWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
  await signInWithEmailAndPassword(auth, email, password)
}
const registerWithEmailAndPassword = async ({ name, email, password }: { name: string, email: string, password: string }) => {
  const res = await createUserWithEmailAndPassword(auth, email, password)
  const user = res.user
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email
  })
}
const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email)
}
const logout = async () => { await signOut(auth) }
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
}
