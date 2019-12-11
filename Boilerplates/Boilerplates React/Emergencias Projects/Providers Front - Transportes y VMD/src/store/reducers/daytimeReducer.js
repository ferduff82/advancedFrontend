
const initialState = {
  daytimeStatus: { 
    isValid: false,
    advancedValidation: false,
    dayTimes: [],
    indexError: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DAYTIME_CREATE':
      return Object.assign({}, state, {
        daytimeStatus: {
          isValid: action.payload.isValid,
          advancedValidation: action.payload.advancedValidation,
          dayTimes: action.payload.dayTimes,
          indexError: action.payload.indexError
        }
      }) 
    default:
      return state
    }
}
