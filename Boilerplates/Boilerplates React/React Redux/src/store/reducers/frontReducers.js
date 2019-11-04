
const initialState = {
  dropdown: {open: 'personalData'}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DROPDOWN':
      return Object.assign({}, state, {
        dropdown: {open: action.payload}
      }) 
    default:
      return state
    }
}
