import navReducer from './dataReducer'
import {combineReducers} from 'redux'
import dataReducer from './dataReducer';
import usersReducer from './usersReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  auth:authReducer,
  data:dataReducer,
  users:usersReducer 
}) 


export default rootReducer
