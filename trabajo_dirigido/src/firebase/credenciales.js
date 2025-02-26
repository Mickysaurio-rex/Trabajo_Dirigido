import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAsTFudYH1Re4qnaPI5J2Y8yebSTo4lSgA",
  authDomain: "trabajodirigidolabupb.firebaseapp.com",
  projectId: "trabajodirigidolabupb",
  storageBucket: "trabajodirigidolabupb.firebasestorage.app",
  messagingSenderId: "353724156420",
  appId: "1:353724156420:web:cbd7a2920ea05b3021c351"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;