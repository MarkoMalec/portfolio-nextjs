import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBe8mpEL94BBzVepj0O__3SXmBP_zzBVvc",
  authDomain: "marko-malec-portfolio.firebaseapp.com",
  projectId: "marko-malec-portfolio",
  storageBucket: "marko-malec-portfolio.appspot.com",
  messagingSenderId: "114645744402",
  appId: "1:114645744402:web:05066f4d7b27a6c3f351cb",
  measurementId: "G-L4BP3MKRJF",
  databaseURL: 'https://marko-malec-portfolio-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
