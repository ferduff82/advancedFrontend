
export const HANDLE_CHECK = 'TERMS_AND_CONDITIONS';
export const HANDLE_SERVICES = 'SERVICES_PROFESSIONAL';

export function validateService(eventData) {
  var isValidValue = eventData && eventData !== 'select' ? true : false;
  console.log(eventData);
  return {
    type: HANDLE_SERVICES,
    payload: {
      isValidValue: isValidValue,
      dataValue: eventData
    }
  }
}

export function checkEvent(eventData) {
  return {
    type: HANDLE_CHECK,
    payload: eventData
  }
}
