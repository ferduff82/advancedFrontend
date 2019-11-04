
export const HANDLE_DROPDOWN = 'OPEN_DROPDOWN';
export const HANDLE_OPENMAP = 'OPEN_MAP';
export const TRIGGER_CELADOR = 'TRIGGER_CELADOR';
export const TRIGGER_LOADING_TRIP = 'TRIGGER_LOADING_TRIP';

var previousOpen = null;

export function openDropdown(dataOpen) {

  if (dataOpen !== previousOpen) {
    previousOpen = dataOpen;
  } else {
    previousOpen = null;
  }

  return {
    type: HANDLE_DROPDOWN,
    payload: previousOpen
  }
}

export function openMap(mapOpen, dataTrip) {
  return {
    type: HANDLE_OPENMAP,
    payload: {
      open: mapOpen,
      dataTrip: dataTrip
    }
  }
}

export function triggerCelador(celador) {
  return {
    type: TRIGGER_CELADOR,
    payload: !celador
  }
}

export function triggerLoadingTrip(loadingTrip) {
  return {
    type: TRIGGER_LOADING_TRIP,
    payload: loadingTrip
  }
}