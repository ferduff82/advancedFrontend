
const initialState = {
  tipoDeVehiculo: '',
  numeroPlazas: '',
  sillaDeRuedas: false,
  rampa: false,
  patente: '',
  vehiculo: '',
  celador: {activate: false}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TRIGGER_TIPO_VEHICULO':
      return Object.assign({}, state, {
        tipoDeVehiculo: action.payload
      }) 
    case 'TRIGGER_NUMERO_PLAZAS':
      return Object.assign({}, state, {
        numeroPlazas: action.payload
      }) 
    case 'TRIGGER_SILLA':
      return Object.assign({}, state, {
        sillaDeRuedas: action.payload
      }) 
    case 'TRIGGER_RAMPA':
      return Object.assign({}, state, {
        rampa: action.payload
      }) 
    case 'TRIGGER_PATENTE':
      return Object.assign({}, state, {
        patente: action.payload
      }) 
    case 'TRIGGER_VEHICULO':
      return Object.assign({}, state, {
        vehiculo: action.payload
      }) 
    case 'TRIGGER_CELADOR':
      return Object.assign({}, state, {
        celador: {activate: action.payload}
      }) 
    default:
      return state
    }
}
