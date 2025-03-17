import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_APP_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID, 
  storageBucket: import.meta.env.VITE_APP_STORAGE, 
  messagingSenderId: import.meta.env.VITE_APP_SENDERID,  
  appId: import.meta.env.VITE_APP_APPID 
};



const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;