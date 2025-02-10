import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBddZ49Iat72im8RRZveH61l-L28fJQOCk",
  authDomain: "app-paciente-a3afd.firebaseapp.com",
  databaseURL: "https://app-paciente-a3afd-default-rtdb.firebaseio.com",
  projectId: "app-paciente-a3afd",
  storageBucket: "app-paciente-a3afd.appspot.com",
  messagingSenderId: "161039716737",
  appId: "1:161039716737:web:214f7e4510f94e09395880",
  measurementId: "G-ETR7SGG7KE"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };