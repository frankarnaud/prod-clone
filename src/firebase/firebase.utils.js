import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC9dhx4FnKtIq_ijwFJwhuB-v858mBFgQA",
    authDomain: "sacred-union-236004.firebaseapp.com",
    databaseURL: "https://sacred-union-236004.firebaseio.com",
    projectId: "sacred-union-236004",
    storageBucket: "sacred-union-236004.appspot.com",
    messagingSenderId: "1088561442327",
    appId: "1:1088561442327:web:55c943f7d0232e254ef652",
    measurementId: "G-FKPP8B9R76"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()
  export const storage = firebase.storage()

  let googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({prompt: 'select_account'})

  let facebookProvider = new firebase.auth.FacebookAuthProvider()
  facebookProvider.setCustomParameters({'display': 'popup'})

  let twitterProvider = new firebase.auth.TwitterAuthProvider()
  twitterProvider.setCustomParameters({'display': 'popup'})

  export const signUpWithGoogle = () => auth.signInWithPopup(googleProvider)
  export const signUpWithTwitter = () => auth.signInWithPopup(twitterProvider)
  export const signUpWithFacebook = () => auth.signInWithPopup(facebookProvider)

  export default firebase