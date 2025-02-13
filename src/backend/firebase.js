import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr1KhHz3kGtj04Izu2Qoi-7lh6L51DOp8",
  authDomain: "crown-clothing-db-a2b02.firebaseapp.com",
  projectId: "crown-clothing-db-a2b02",
  storageBucket: "crown-clothing-db-a2b02.firebasestorage.app",
  messagingSenderId: "247907513",
  appId: "1:247907513:web:61997883976cd902eac768",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebaseApp);
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  for (const obj of objectsToAdd) {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  }

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) {
    throw new Error("User auth is required");
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
    userSnapshot = await getDoc(userDocRef);
  }

  return userSnapshot;
};

export const createUserAuthFromEmail = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUserAuth = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
