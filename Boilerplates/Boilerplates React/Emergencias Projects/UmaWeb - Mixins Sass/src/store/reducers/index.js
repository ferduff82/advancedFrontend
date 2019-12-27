
import { combineReducers } from 'redux';
import predict from './predictReducers';
import front from '../reducers/frontReducers';
import autonomous from '../reducers/autonomousReducers';

const appReducer = combineReducers({
    predict,
    autonomous,
    front
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
