const localConfig = require("../local.config");

import firebase from 'firebase/app';
import "firebase/firestore";
// import {initialize} from "firebase-firestorm/lib/store";
import * as firestorm from "firebase-firestorm";
// import * as firestorm from "./firebase-firestorm-es6/lib";

// import * as fireorm from "fireorm";

const firestore = firebase.initializeApp(localConfig.firebaseConfig).firestore();
firestorm.initialize(firestore);
// fireorm.initialize(firestore);