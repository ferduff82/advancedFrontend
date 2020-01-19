
const initialState = {
  geoActive: false,
  coords: {lat: '', lon: ''}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GEO_ACTIVE':
      return Object.assign({}, state, {
        isGeoActive: action.payload
      }) 
    case 'SET_COORDS':
      return Object.assign({}, state, {
        coords: action.payload
      }) 
    default:
      return state
    }
}
