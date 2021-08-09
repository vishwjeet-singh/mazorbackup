import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firebase-firestore"
const fire = firebase.initializeApp({
    apiKey: "AIzaSyDDu6rRDggu2167fm4XDkDwvPbMAe07734",
    authDomain: "unmazer-login.firebaseapp.com",
    projectId: "unmazer-login",
    storageBucket: "unmazer-login.appspot.com",
    messagingSenderId: "196041488810",
    appId: "1:196041488810:web:f2ccda1932282b6ee5d3d3"
})

export const auth = fire.auth()
export const db=fire.firestore()
//export const  app =fire.database().ref();