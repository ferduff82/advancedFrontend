
const initialState = {
  calendarDates: {
    payload: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CALENDAR_DATE_ADDED':
      return Object.assign({}, state, {
        calendarDates: {payload: action.payload}
      }) 
    case 'CALENDAR_DATE_REMOVED':
      return Object.assign({}, state, {
        calendarDates: {payload: action.payload}
      }) 
    case 'CALENDAR_DATE_INITIAL':
      return Object.assign({}, state, {
        calendarDates: {payload: action.payload}
      }) 
    default:
      return state
    }
}
