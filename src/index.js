import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import {composeWithDevTools} from 'redux-devtools-extension';



const firebaseConfig = {
    apiKey: "AIzaSyAj2txAIKQb-tgQj2M6TU8nPPxUgZL2Scw",
    authDomain: "bootcamp-teddy-lin.firebaseapp.com",
    databaseURL: "https://bootcamp-teddy-lin.firebaseio.com",
    projectId: "bootcamp-teddy-lin",
    storageBucket: "bootcamp-teddy-lin.appspot.com",
    messagingSenderId: "955597322163",
    appId: "1:955597322163:web:eda852f0452aa8db9a3dc6"
  };

firebase.initializeApp(firebaseConfig);
  
  // Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
  });
  
// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

const rrfConfig = {
    userProfile: 'users'
// useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
// enableClaims: true // Get custom claims along with the profile
}
  
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  }
  
  

ReactDOM.render(
    <Provider store={store}>
         <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>, 
    document.getElementById('root'),
);

