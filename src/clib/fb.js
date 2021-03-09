import firebase from 'firebase';
var app = firebase.initializeApp({
    apiKey: "AIzaSyDHQnXSNPSf7Mp7M9oY3FfPHozeEZrKBpw",
    authDomain: "devkeep-5c91d.firebaseapp.com",
    databaseURL: "https://devkeep-5c91d.firebaseio.com",
    projectId: "devkeep-5c91d",
    storageBucket: "devkeep-5c91d.appspot.com",
    messagingSenderId: "935471649093",
    appId: "1:935471649093:web:5256782471a948ac7eae2c",
    measurementId: "G-NTVM0BE54H"
});

const firestore = app.firestore()


export const requestBetaAccess = async (email, name) => {
    return firestore.collection("/beta-access-request-list").add({
        email
    })
}