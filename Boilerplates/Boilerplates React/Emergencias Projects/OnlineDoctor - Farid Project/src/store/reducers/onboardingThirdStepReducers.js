
const initialState = {
    id: {
        filePreview: '',
        file: {}
    },
    licence: {
        filePreview: '',
        file: {}
    },
    qualification: {
        filePreview: '',
        file: {}
    },
    idExpires: '',
    credentialExpires: '',
    disabilityExpires: ''
}

export default function cancelTrip(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ID_THIRD_STEP':
            return { ...state, id: action.payload }
        case 'ADD_LICENCE_THIRD_STEP':
            return { ...state, licence: action.payload }
        case 'ADD_QUALIFICATION_THIRD_STEP':
            return { ...state, qualification: action.payload }
        case 'ADD_ID_EXPIRATION_THIRD_STEP':
            return { ...state, idExpires: action.payload }
        case 'ADD_CREDENTIAL_EXPIRATION_THIRD_STEP':
            return { ...state, credentialExpires: action.payload }
        case 'ADD_DISABILITY_EXPIRATION_THIRD_STEP':
            return { ...state, disabilityExpires: action.payload }
        default:
            return state;
    }
}
