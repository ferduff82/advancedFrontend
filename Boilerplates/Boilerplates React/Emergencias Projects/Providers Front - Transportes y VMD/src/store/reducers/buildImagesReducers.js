
const initialState = {
  dni: { data: '' },
  cv: { data: '' },
  titulo: { data: '' },
  seguro: { data: '' },
  afip: { data: '' },
  matricula: { data: '' },
  especialidad: { data: '' },
  certificado: { data: '' },
  aeropuerto: { data: '' },
  signature: '',
  embedings: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BUILD_POST_DNI':
      return Object.assign({}, state, {
        dni: { data: action.payload }
      })
    case 'BUILD_POST_CV':
      return Object.assign({}, state, {
        cv: { data: action.payload }
      })
    case 'BUILD_POST_TITULO':
      return Object.assign({}, state, {
        titulo: { data: action.payload }
      })
    case 'BUILD_POST_SEGURO':
      return Object.assign({}, state, {
        seguro: { data: action.payload }
      })
    case 'BUILD_POST_AFIP':
      return Object.assign({}, state, {
        afip: { data: action.payload }
      })
    case 'BUILD_POST_MATRICULA':
      return Object.assign({}, state, {
        matricula: { data: action.payload }
      })
    case 'BUILD_POST_ESPECIALIDAD':
      return Object.assign({}, state, {
        especialidad: { data: action.payload }
      })
    case 'BUILD_POST_CERTIFICADO':
      return Object.assign({}, state, {
        certificado: { data: action.payload }
      })
    case 'BUILD_POST_AEROPUERTO':
      return Object.assign({}, state, {
        aeropuerto: { data: action.payload }
      })
    case 'SET_SIGNATURE':
      return { ...state, signature: action.payload }
    case 'SET_EMBEDINGS':
      return { ...state, embedings: action.payload }
    default:
      return state
  }
}
