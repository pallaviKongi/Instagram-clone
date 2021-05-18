// Run the Seed file here only ONCE!

import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import seed file here
// import seedDatabase from '../seed';

const config = {
  apiKey: 'AIzaSyADTAaQ3axFKyWQtYlCOh0_j3CYXjkl0T0',
  authDomain: 'instagram-yt-3968d.firebaseapp.com',
  projectId: 'instagram-yt-3968d',
  storageBucket: 'instagram-yt-3968d.appspot.com',
  messagingSenderId: '841243363787',
  appId: '1:841243363787:web:b9c01996aa439db84cce4e',
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);
export { firebase, FieldValue };
