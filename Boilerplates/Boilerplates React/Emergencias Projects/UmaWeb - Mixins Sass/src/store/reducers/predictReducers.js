const initialState = {
    symptoms: "",
    writingSymptom: ""
  }

  export default function predict(state = initialState, action) {
    switch (action.type) {
        case 'SET_SYMPTOM':
            return { ...state, symptoms: state.symptoms.concat(" ", action.payload) };
        case 'WRITE_SYMPTOM':
            return { ...state, writingSymptom: action.payload }
        case 'RESET_SYMPTOM':
                return { ...state, writingSymptom: '', symptoms: '' }
        default:
            return state;
    }
  }