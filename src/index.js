import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';

import App from './components/App';
import auth from './auth';
import history from './history';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import { NEMLibrary, NetworkTypes } from 'nem-library';
import { initializeAccount } from './nem/AccountUtils';

import * as config from './config';

firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: 'socialcake-nem-hackathon.firebaseapp.com',
  databaseURL: 'https://socialcake-nem-hackathon.firebaseio.com',
  projectId: 'socialcake-nem-hackathon',
  storageBucket: 'socialcake-nem-hackathon.appspot.com',
  messagingSenderId: config.firebase.messagingSenderId,
});

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
initializeAccount(config.nem.privateKey, config.nem.namespace);

const render = props =>
  new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <App {...props} />,
        document.getElementById('root'),
        resolve(props),
      );
    } catch (err) {
      reject(err);
    }
  });

const resolve = promise =>
  promise.then(({ user, location }) =>
    routes.resolve({
      pathname: location.pathname,
      location,
      user,
      render,
    }),
  );

let promise;

auth.onAuthStateChanged(user => {
  if (!promise) {
    promise = Promise.resolve({ user, location: history.location });
    history.listen(location => {
      promise = resolve(promise.then(x => ({ ...x, location })));
    });
  }
  promise = resolve(promise.then(x => ({ ...x, user })));
});

registerServiceWorker();
