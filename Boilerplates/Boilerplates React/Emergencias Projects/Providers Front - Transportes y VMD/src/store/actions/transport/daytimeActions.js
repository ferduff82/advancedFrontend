
/* Useful Methods */

import RandomId from "../../../components/global/Utilities/RandomId";
import ValidateDates from "../../../components/transportist/transfers/validations/ValidateDaytimes";

/* Types */

export const DAYTIME_CREATE = 'DAYTIME_CREATE';

/* Actions */

export function initialDaytime(dayTimes) {

  var newDaytime = dayTimes.slice(0);
  var newArray = [];

  newDaytime.forEach(function(item) {
    newArray.push({
      day: item.day,
      hourFrom: item.hour_from,
      hourUntil: item.hour_until,
      service: item.service,
      id: RandomId()
    });
  })

  /* Validate if Daytime is Empty or not */

  var isValidValue = (newArray.length > 0) ? true : false;

  return {
    type: DAYTIME_CREATE,
    payload: {
			isValid: isValidValue,
			advancedValidation: false,
      dayTimes: newArray
    }
  }
}

export function createDayTime(dayTimes) {

  var cloneDaytimes = dayTimes.slice(0);
  var indexError = null;

  cloneDaytimes.push({
    day: 'Lunes',
    hourFrom: '00:00',
    hourUntil: '01:00',
    service: 'visita-medica',
    id: RandomId()
  });

  /* Validate if Daytime is Empty or not */

  var isValidValue = (cloneDaytimes.length > 0) ? true : false;

  var advancedValidation = ValidateDates(cloneDaytimes);

  if (advancedValidation) {
    indexError = cloneDaytimes.length - 1;
  }

  return {
    type: DAYTIME_CREATE,
    payload: {
			isValid: isValidValue,
			advancedValidation: advancedValidation,
      dayTimes: cloneDaytimes,
      indexError: indexError
    }
  }
}

export function removeDayTime(id, dayTimes) {

  const cloneDomElements = dayTimes.slice(0);
  const filterArray = cloneDomElements.filter(function(event, index) {
      return id !== event.id;
  })

  /* Validate if Daytime is Empty or not */

  var isValidValue = (filterArray.length > 0) ? true : false;

  var advancedValidation = ValidateDates(filterArray);

  return {
    type: DAYTIME_CREATE,
    payload: {
			isValid: isValidValue,
			advancedValidation: advancedValidation,
      dayTimes: filterArray
    }
  }
}

export function editDate(id, valueType, value, daytimeStatus, index) {

  var getdaytimes = daytimeStatus._dayTimes;
  var clonedTime = getdaytimes.slice(0);
  var indexError = null;

  function editTime(prop, value) {
    clonedTime.map(function(event, index) {
      if (event.id === id) {
          event[prop] = value;
      }
    })
  }

  if (valueType === 'day') {
    editTime('day', value)
  } else if (valueType === 'hourFrom') {
    editTime('hourFrom', value)
  } else if (valueType === 'hourUntil') {
    editTime('hourUntil', value)
  } else {
    editTime('service', value)
  }

  var advancedValidation = ValidateDates(clonedTime);

  if (advancedValidation) {
    indexError = index;
  }
  
  return {
    type: DAYTIME_CREATE,
    payload: {
			isValid: daytimeStatus._isValid,
			advancedValidation: advancedValidation,
      dayTimes: clonedTime,
      indexError: indexError
    }
  }
}
