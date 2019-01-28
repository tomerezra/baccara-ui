import navReducer from './navReducer'
import {combineReducers} from 'redux'
import authReducer from './authReducer';


const rootReducer = combineReducers({
  auth:authReducer,
  nav:navReducer 
}) 


export default rootReducer
