
import { combineReducers } from 'redux';
import front from './frontReducers';
import validate from './validateReducers';
import buildImages from './buildImagesReducers';
import calendar from './calendarReducer';
import generalData from './generalDataReducer';

const appReducer = combineReducers({
  generalData,
  front,
  validate,
  buildImages,
  calendar
})

const rootReducer = (state, action) => {
  /* if (action.type === 'RESET_ALL') {
    state = undefined
  } */
  return appReducer(state, action)
}

export default rootReducer;
