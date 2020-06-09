import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCTRKL-BTfB4pSiZJh--9oStesMTySrpEg",
    authDomain: "ombrellone-1f2f0.firebaseapp.com",
    databaseURL: "https://ombrellone-1f2f0.firebaseio.com",
    projectId: "ombrellone-1f2f0",
    storageBucket: "ombrellone-1f2f0.appspot.com",
    messagingSenderId: "428776112192",
    appId: "1:428776112192:web:b3b3f53757f22a87d7dfa5",
    measurementId: "G-LTMFQSMZFK"
};

firebase.initializeApp(config);

export default firebase.database().ref();