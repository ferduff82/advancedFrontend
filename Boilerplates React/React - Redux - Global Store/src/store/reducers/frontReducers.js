
const initialState = {
  dropdown: {open: 'personalData'},
  map: {
    open: false,
    dataTrip: {}
  },
  celador: {activate: false},
  loadingTrip: {activate: false}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DROPDOWN':
      return Object.assign({}, state, {
        dropdown: {open: action.payload}
      }) 
    case 'OPEN_MAP':
      return Object.assign({}, state, {
        map: {
          open: action.payload.open,
          dataTrip: action.payload.dataTrip
        }
      }) 
    case 'TRIGGER_CELADOR':
      return Object.assign({}, state, {
        celador: {activate: action.payload}
      }) 
    case 'TRIGGER_LOADING_TRIP':
        return Object.assign({}, state, {
          loadingTrip: {activate: action.payload}
        }) 
    default:
      return state
    }
}
