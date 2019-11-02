
const initialState = {
  checked: {isChecked: false},
  isValidValue: {isValid: true},
  dayTimeIsNotEmpty: {isValid: false}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TERMS_AND_CONDITIONS':
      return Object.assign({}, state, {
        checked: {isChecked: !action.payload}
      }) 
    case 'SERVICES_PROFESSIONAL':
      return Object.assign({}, state, {
        isValidValue: {isValid: action.payload}
      }) 
    case 'DAYTIME_ADDEDDAYTIME':
      return Object.assign({}, state, {
        dayTimeIsNotEmpty: {isValid: action.payload}
      }) 
    default:
      return state
    }
}
