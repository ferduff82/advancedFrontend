
import { combineReducers } from 'redux';
import front from './frontReducers';
import validate from './validateReducers';
import buildImages from './buildImagesReducers';
import daytimes from './daytimeReducer';
import calendar from './calendarReducer';
import upload from './uploadReducer';
import generalData from './generalDataReducer';
import professionalsData from './professionalsReducer';
import geoActive from './geolocationActiveReducer';
import assigns from './assignReducers';


const appReducer = combineReducers({
  generalData,
  front,
  validate,
  buildImages,
  daytimes,
  calendar,
  professionalsData,
  geoActive,
  upload,
  assigns
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
