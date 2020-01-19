
const initialState = {
  checked: {isChecked: false},
  isValidValue: {
    isValid: true,
    data: null
  },
  isSpecialtyValid: {
    isValid: true,
    data: null
  },
  dayTimeIsNotEmpty: {isValid: false},
  medicalVisit: false,
  consultory: false,
  onLine: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TERMS_AND_CONDITIONS':
      return Object.assign({}, state, {
        checked: {isChecked: !action.payload}
      }) 
    case 'ROL_PROFESSIONAL':
      return Object.assign({}, state, {
        isValidValue: {
          isValid: action.payload.isValidValue,
          data: action.payload.dataValue
        }
      }) 
    case 'SPECIALTY_PROFFESSIONAL':
      return Object.assign({}, state, {
        isSpecialtyValid: {
          isValid: action.payload.isValidValue,
          data: action.payload.dataValue
        }
      }) 
    case 'CHECK_MEDICAL_VISIT_PROFESSIONAL':
      return Object.assign({}, state, {
        medicalVisit: !action.payload
      }) 
    case 'CHECK_CONSULTORY_PROFESSIONAL':
      return Object.assign({}, state, {
        consultory: !action.payload
      }) 
    case 'CHECK_ONLINE_PROFESSIONAL':
      return Object.assign({}, state, {
        onLine: !action.payload
      }) 
    case 'DAYTIME_ADDEDDAYTIME':
      return Object.assign({}, state, {
        dayTimeIsNotEmpty: {isValid: action.payload}
      }) 
    default:
      return state
    }
}
