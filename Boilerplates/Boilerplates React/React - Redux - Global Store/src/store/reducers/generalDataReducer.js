
const initialState = {
  cuit: { cuitData: '0' },
  socialWork: { socialWorkData: '' },
  assignations: { assignationsData: [] }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TRIGGER_CUIT':
      return Object.assign({}, state, {
        cuit: {cuitData: action.payload}
      }) 
    case 'TRIGGER_SOCIAL':
      return Object.assign({}, state, {
        socialWork: {socialWorkData: action.payload}
      }) 
    case 'TRIGGER_ASSIGNATIONS':
      return Object.assign({}, state, {
        assignations: {assignationsData: action.payload}
      }) 
    default:
      return state
    }
}
