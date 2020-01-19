
export function inputProfessionals(TRIGGER_TYPE, dataProfessional) {

  return {
    type: TRIGGER_TYPE,
    payload: dataProfessional
  }
}

export function triggerCelador(celador) {
  return {
    type: 'TRIGGER_CELADOR',
    payload: celador
  }
}
