
import { combineReducers } from 'redux';
import front from './frontReducers';
import validate from './validateReducers';

const appReducer = combineReducers({
  front,
  validate
})

const rootReducer = (state, action) => {
  /* if (action.type === 'RESET_ALL') {
    state = undefined
  } */
  return appReducer(state, action)
}

export default rootReducer;
