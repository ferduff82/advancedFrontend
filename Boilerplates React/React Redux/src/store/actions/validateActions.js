
export const HANDLE_CHECK = 'TERMS_AND_CONDITIONS';
export const HANDLE_SERVICES = 'SERVICES_PROFESSIONAL';
export const HANDLE_DAYTIME = 'DAYTIME_ADDEDDAYTIME';

export function validateService(eventData) {
  var isValidValue = eventData ? true : false;
  return {
    type: HANDLE_SERVICES,
    payload: isValidValue
  }
}

export function validateDaytime(eventData) {
  var isValidValue = (eventData > 0) ? true : false;
  return {
    type: HANDLE_DAYTIME,
    payload: isValidValue
  }
}

export function checkEvent(eventData) {
  return {
    type: HANDLE_CHECK,
    payload: eventData
  }
}
