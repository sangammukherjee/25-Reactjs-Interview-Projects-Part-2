import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjFhXRBmifhpv9wl0qsqs7rQlv7vs6xGI",
  authDomain: "react-interview-firebase.firebaseapp.com",
  projectId: "react-interview-firebase",
  storageBucket: "react-interview-firebase.appspot.com",
  messagingSenderId: "425936815245",
  appId: "1:425936815245:web:96fbdba89af9ad6cb7cec4",
  measurementId: "G-9T4235HXQY",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

async function loginUsingEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
}

async function registerUsingEmailAndPassword(name, email, password) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
  }
}

function logout() {
  signOut(auth);
}

export {
  auth,
  loginUsingEmailAndPassword,
  logout,
  registerUsingEmailAndPassword,
};
