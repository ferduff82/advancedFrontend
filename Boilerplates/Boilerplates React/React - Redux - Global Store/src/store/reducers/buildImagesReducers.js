
const initialState = {
  dni: {data: {}},
  cv: {data: {}},
  titulo: {data: {}},
  seguro: {data: {}},
  afip: {data: {}},
  celador: {data: {}}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BUILD_POST_DNI':
      return Object.assign({}, state, {
        dni: {data: action.payload}
      }) 
    case 'BUILD_POST_CV':
      return Object.assign({}, state, {
        cv: {data: action.payload}
      }) 
    case 'BUILD_POST_TITULO':
      return Object.assign({}, state, {
        titulo: {data: action.payload}
      }) 
    case 'BUILD_POST_SEGURO':
      return Object.assign({}, state, {
        seguro: {data: action.payload}
      }) 
    case 'BUILD_POST_AFIP':
      return Object.assign({}, state, {
        afip: {data: action.payload}
      }) 
    case 'BUILD_POST_CELADOR':
      return Object.assign({}, state, {
        celador: {data: action.payload}
      }) 
    default:
      return state
    }
}
