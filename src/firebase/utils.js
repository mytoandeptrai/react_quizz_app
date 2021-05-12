import firebase from "firebase";
import { firebaseConfig } from "./config";
import "firebase/firestore";
import "firebase/auth";

export const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
