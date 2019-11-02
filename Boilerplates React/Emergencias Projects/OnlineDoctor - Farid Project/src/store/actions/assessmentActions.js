export function saveSymptom(symptom) {
    return {
      type: 'SET_SYMPTOM',
      payload: symptom
    }
  }