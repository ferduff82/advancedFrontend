const initialState = {
    users: {
      all: [],
      id: [],
      service: [],
      monitor: [],
      outcome: [] 
    }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AUTH':
     return {'all': action.payload}
    case 'FILTER_ID':
      return  Object.assign({}, state, {
        'id': action.payload
      })
    case 'FILTER_SERVICE':
      return Object.assign({}, state, {
        'service': action.payload
      })
    case 'FILTER_MONITOR':
      return Object.assign({}, state, {
        'monitor': action.payload
      })
    case 'FILTER_OUTCOME':
      return Object.assign({}, state, {
        'outcome': action.payload
      })  
    default:
     return state
    }
}
