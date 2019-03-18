
import {combineReducers} from 'redux'
import dataReducer from './dataReducer';

import authReducer from './authReducer'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
const rootReducer = combineReducers({
  auth:authReducer,
  data:dataReducer,
  
  firestore:firestoreReducer,
  firebase:firebaseReducer 
}) 


export default rootReducer
