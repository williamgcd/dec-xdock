import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
   // dec-xdock-dev
   // apiKey: 'AIzaSyBTn0BkjNIKhYxNCrskq6nO_pfSOZBsIgg',
   // authDomain: 'dec-xdock-dev.firebaseapp.com',
   // projectId: 'dec-xdock-dev',
   // storageBucket: 'dec-xdock-dev.appspot.com',
   // messagingSenderId: '770058307297',
   // appId: '1:770058307297:web:ca6040ca13f5049c2299a0',
   // measurementId: 'G-N0R90FXN0C',

   // dec-xdock-dev1
   apiKey: 'AIzaSyBrfZlZnVuAM-nPnXxrHjIrU97UKhs-UkM',
   authDomain: 'dec-xdock-dev1.firebaseapp.com',
   projectId: 'dec-xdock-dev1',
   storageBucket: 'dec-xdock-dev1.appspot.com',
   messagingSenderId: '164885050499',
   appId: '1:164885050499:web:f5a54b421ae7702c2c57b6',
   measurementId: 'G-1DZB53Z1QQ',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export { firebase };
