
import { combineReducers } from 'redux';
import predict from './predictReducers';
import front from '../reducers/frontReducers';

const appReducer = combineReducers({
    predict,
    front
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
