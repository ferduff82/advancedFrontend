const initialState = {
    questions: [],
    symptoms: [],
    appointments: [],
    patient: {service: []},
    medicalRecord: [],
    voucher: [],
    callSettings: {room: "", token: ""},
    geolocation: {lat: '', lng: ''}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_QUESTIONS':
        return Object.assign({}, state, {
          questions: action.payload
        })
      case 'GET_SYMPTOMS':
        return Object.assign({}, state, {
          symptoms: action.payload
        })
      case 'GET_APPOINTMENTS':
        return Object.assign({}, state, {
          appointments: action.payload
        })
      case 'GET_PATIENT':
        return Object.assign({}, state, {
          patient: action.payload
        })
      case 'GET_MEDICAL_RECORD':
        return Object.assign({}, state, {
          medicalRecord: action.payload
        })
      case 'GET_ONE_RECORD': 
        return Object.assign({}, state, {
          voucher: action.payload
        })
      case 'SET_GEOLOCATION': 
        return {
          ...state, geolocation: action.payload
        }
      case 'SET_CALL_ROOM': 
        return Object.assign({}, state, {
          callSettings: action.payload
        })
      default:
       return state
      }
  }
  