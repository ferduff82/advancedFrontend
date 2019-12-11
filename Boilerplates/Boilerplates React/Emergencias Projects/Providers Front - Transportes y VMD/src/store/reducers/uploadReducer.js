
const initialState = {
  expireId : '',
  expireInsurance: '',
  expireMatricula: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ID_EXPIRE':
      return Object.assign({}, state, {
        expireId : action.payload
      }) 
    case 'INSURANCE_EXPIRE':
      return Object.assign({}, state, {
        expireInsurance: action.payload
      }) 
    case 'MATRICULA_EXPIRE':
      return Object.assign({}, state, {
        expireMatricula: action.payload
      }) 
    default:
      return state
    }
}
