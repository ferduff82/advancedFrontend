import { combineReducers } from 'redux'
import users from './authReducers'
import frontReducers from './frontReducers'
import mapReducers from './mapReducers';

export default combineReducers({
  users,
  frontReducers,
  mapReducers,
})