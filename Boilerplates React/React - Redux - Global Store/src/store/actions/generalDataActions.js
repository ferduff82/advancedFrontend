
export function triggerCuit(cuit) {
  return {
    type: 'TRIGGER_CUIT',
    payload: cuit
  }
}

export function triggerSocialWork(dataSocialWork) {
  return {
    type: 'TRIGGER_SOCIAL',
    payload: dataSocialWork
  }
}

export function triggerAssigations(assignations) {
  return {
    type: 'TRIGGER_ASSIGNATIONS',
    payload: assignations
  }
}

