import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";

const config = {
  apiKey: "AIzaSyCg1x3IJVTFYlVhNourjuFNSX0DEEVlMi0",
  authDomain: "crwn-db-b6443.firebaseapp.com",
  projectId: "crwn-db-b6443",
  storageBucket: "crwn-db-b6443.appspot.com",
  messagingSenderId: "123023404757",
  appId: "1:123023404757:web:d3e98fb40752f64ded3c5c",
  measurementId: "G-3Q4ESGT2QG",
};

const app = initializeApp(config);

export const firestore = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const currentUser = doc(firestore, "users", userAuth.uid);
  const userRef = collection(firestore, "users");

  const snapShot = await getDoc(currentUser);

  let querySnapshot;
  if (snapShot.exists() === false) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(userRef, userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      querySnapshot = await getDoc(currentUser);
      return querySnapshot;
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
    return (querySnapshot = await getDoc(currentUser));
  }
};

export const auth = getAuth();

const provider = new GoogleAuthProvider(app);
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
