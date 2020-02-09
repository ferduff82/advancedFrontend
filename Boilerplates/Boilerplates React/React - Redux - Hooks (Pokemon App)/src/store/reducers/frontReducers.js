
const initialState = {
  dropdown: false,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DROPDOWN':
      return Object.assign({}, state, {
        dropdown: action.payload
      }) 
    case 'SET_LOADING':
      return Object.assign({}, state, {
        loading: !state.loading
      }) 
    default:
      return state
    }
}
