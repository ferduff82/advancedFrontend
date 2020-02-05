
import { combineReducers } from 'redux';
import front from './frontReducers';

const appReducer = combineReducers({
  front
})

const rootReducer = (state, action) => {
  /* if (action.type === 'RESET_ALL') {
    state = undefined
  } */
  return appReducer(state, action)
}

export default rootReducer;
