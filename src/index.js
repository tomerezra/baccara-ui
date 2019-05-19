
import "semantic-ui-css/semantic.min.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, applyMiddleware, compose } from 'redux'
import { ReactReduxFirebaseProvider} from 'react-redux-firebase'
import { createFirestoreInstance} from 'redux-firestore' // <- needed if using firestore
import thunk from 'redux-thunk'
import rootReducer from '../src/store/reducers/rootReducer'
import App from "./App"
import { HashRouter as Router } from "react-router-dom";
import fbConfig from '../src/config/fbConfig'

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady:true
}


// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

// Create store with reducers and initial state

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({firebase}))))

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


ReactDOM.render(<Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>
                    <App />
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>, document.getElementById('root'));