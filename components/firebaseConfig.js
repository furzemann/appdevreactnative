import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
// Optionally import the services that you want to use
 import { getFirestore } from "firebase/firestore"; 

// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth};
export default app;