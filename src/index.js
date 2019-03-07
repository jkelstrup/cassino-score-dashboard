// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

// Misc
// import registerServiceWorker from './registerServiceWorker';
// import 'src/misc/inobounce.js';

// Components
import App from 'src/components/App/App';

// Local
import './index.scss';

const config = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
// registerServiceWorker();
