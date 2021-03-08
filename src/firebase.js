import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyBTn0BkjNIKhYxNCrskq6nO_pfSOZBsIgg',
   authDomain: 'dec-xdock-dev.firebaseapp.com',
   projectId: 'dec-xdock-dev',
   storageBucket: 'dec-xdock-dev.appspot.com',
   messagingSenderId: '770058307297',
   appId: '1:770058307297:web:ca6040ca13f5049c2299a0',
   measurementId: 'G-N0R90FXN0C',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export { firebase };
