import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDPEwZfMhohlybJxMwf9vvsXOXH6eNPuBc',
  authDomain: 'abacus-mental.firebaseapp.com',
  databaseURL: 'https://abacus-mental-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'abacus-mental',
  storageBucket: 'abacus-mental.appspot.com',
  messagingSenderId: '490198139260',
  appId: '1:490198139260:web:c8e338d89f46ad687d64f9',
  measurementId: 'G-VPK1GQB87F',
}

firebase.initializeApp(firebaseConfig)

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export default firebase
