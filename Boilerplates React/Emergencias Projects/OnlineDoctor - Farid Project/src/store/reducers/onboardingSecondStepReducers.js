
const initialState = {
    disability: '',
    certificateNumber: 0,
    wheelChair: '0',
    diagnostic: '',
    protection: '0',
    companionName: ''
}

export default function cancelTrip(state = initialState, action) {
    switch (action.type) {
        case 'ADD_DISABILITY':
            return { ...state, disability: action.payload }
        case 'ADD_CERTIFICATE':
            return { ...state, certificateNumber: action.payload }
        case 'ADD_WHEELCHAIR':
            return { ...state, wheelChair: action.payload }
        case 'ADD_DIAGNOSTIC':
            return { ...state, diagnostic: action.payload }
        case 'ADD_PROTECTION':
            return { ...state, protection: action.payload }
        case 'ADD_COMPANION':
            return { ...state, companionName: action.payload }
        default:
            return state;
    }
}
