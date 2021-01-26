// firebase stuff
import {localConfig} from "./local.config";

import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

admin.initializeApp({
  credential: admin.credential.cert(localConfig.firebaseConfig),
  databaseURL: localConfig.firebaseConfig.databaseURL
});

const firestore = admin.firestore();
fireorm.initialize(firestore)

// import firebase from 'firebase/app';
// import "firebase/firestore";


// svelte stuff
import App from "./App.svelte";

var app = new App({
  target: document.body,
});

export default app;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
