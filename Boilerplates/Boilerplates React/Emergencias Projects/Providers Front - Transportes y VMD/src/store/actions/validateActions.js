
export function validateService(eventData) {
  return (dispatch) => {
    var isValidValue = eventData && eventData !== 'select' ? true : false;
    if (eventData !== 'MEDICO') {
      dispatch(validateSpecialty(''))
      dispatch(dispatchService())
    } else {
      dispatch(dispatchService())
    }
    function dispatchService() {
      return {
        type: 'ROL_PROFESSIONAL',
        payload: {
          isValidValue: isValidValue,
          dataValue: eventData
        }
      }
    }
  }
}

export function validateSpecialty(eventData) {
  var isValidValue = eventData && eventData !== 'select' ? true : false;
  return {
    type: 'SPECIALTY_PROFFESSIONAL',
    payload: {
      isValidValue: isValidValue,
      dataValue: eventData
    }
  }
}

export function checkEvent(eventData) {
  return {
    type: 'TERMS_AND_CONDITIONS',
    payload: eventData
  }
}

export function setCheckProfessional(value, type) {
  if (type === 'medicalVisit') {
    return {
      type: 'CHECK_MEDICAL_VISIT_PROFESSIONAL',
      payload: value
    }
  } else if (type === 'consultory') {
    return {
      type: 'CHECK_CONSULTORY_PROFESSIONAL',
      payload: value
    }
  } else {
    return {
      type: 'CHECK_ONLINE_PROFESSIONAL',
      payload: value
    }
  }
}

