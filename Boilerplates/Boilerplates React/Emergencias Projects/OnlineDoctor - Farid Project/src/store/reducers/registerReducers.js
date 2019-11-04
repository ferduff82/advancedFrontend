
const initialState = {
    coreId: '',
    email: '',
    dni: '',
    sex: '',
    dob: '',
    address: '',
    city: '',
    piso: '',
    ws: '',
    day: '00',
    month: '00',
    year: '0000',
    dt: '',
    os: '',
    osNumber: 0,
    fullname: '',
}

export default function frontReducers(state = initialState, action) {
    switch (action.type) {
        case 'REGISTER_FIRST_CORE':
            return{ ...state, coreId: action.payload }
        case 'REGISTER_FIRST_EMAIL':
            return{ ...state, email: action.payload }
        case 'REGISTER_FIRST_DNI':
            return{ ...state, dni: action.payload }
        case 'REGISTER_FIRST_SEX':
            return{ ...state, sex: action.payload }
        case 'REGISTER_FIRST_DOB':
            return{ ...state, dob: action.payload }
        case 'REGISTER_FIRST_ADDRESS':
            return{ ...state, address: action.payload }
        case 'REGISTER_FIRST_CITY':
            return{ ...state, city: action.payload }
        case 'REGISTER_FIRST_PISO':
            return{ ...state, piso: action.payload }
        case 'REGISTER_FIRST_WS':
            return{ ...state, ws: action.payload }
        case 'REGISTER_FIRST_DAY':
            return{ ...state, day: action.payload }
        case 'REGISTER_FIRST_MONTH':
            return{ ...state, month: action.payload }
        case 'REGISTER_FIRST_YEAR':
            return{ ...state, year: action.payload }
        case 'REGISTER_FIRST_DT':
            return{ ...state, dt: action.payload }
        case 'REGISTER_FIRST_OS':
            return{ ...state, os: action.payload }
        case 'REGISTER_FIRST_OS_NUMBER':
            return{ ...state, osNumber: action.payload }
        case 'REGISTER_FIRST_FULLNAME':
            return{ ...state, fullname: action.payload }
        default:
            return state;
    }
}
