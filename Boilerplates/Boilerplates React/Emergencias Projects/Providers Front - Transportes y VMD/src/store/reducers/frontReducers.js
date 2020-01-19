const initialState = {
    dropdown: { open: 'personalData' },
    loadingTrip: { activate: false },
    modalAction: false,
    toggle: { open: false },
    alert: {
        active: false,
        title: '',
        msg: ''
    },
    loading: false,
    modal: false,
    map: {
        open: false,
        dataTrip: {}
    },
    register: {
        tel: "",
        pass: "",
        type: "",
        cuil: ""
    },
    user: {},
    questions: false,
    rejectModal: false
}

export default function frontReducers(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, modal: true }
        case 'CLOSE_MODAL':
            return { ...state, modal: false }
        case 'SET_LOADING':
            return { ...state, loading: !state.loading }
        case 'SET_REGISTER_DATA':
            return { ...state, register: action.payload }
        case 'SET_USER_DATA':
            return { ...state, user: action.payload }
        case 'OPEN_DROPDOWN':
            return Object.assign({}, state, {
                dropdown: { open: action.payload }
            })
        case 'OPEN_MAP':
            return Object.assign({}, state, {
                map: {
                    open: action.payload.open,
                    dataTrip: action.payload.dataTrip
                }
            })
        case 'TOGGLE_MODAL':
            return Object.assign({}, state, {
                modalAction: action.payload
            })
        case 'TOGGLE_DROPDOWN':
            return Object.assign({}, state, {
                toggle: { open: action.payload }
            })
        case 'TRIGGER_LOADING_TRIP':
            return Object.assign({}, state, {
                loadingTrip: { activate: action.payload }
            })
        case 'OPEN_QUESTIONS':
            return {
                ...state,
                'questions': true
            }
        case 'HANDLE_REJECT_MODAL':
            return {
                ...state,
                'rejectModal': !state.rejectModal
            }
        case 'VIEW_NEXT_ATTENTIONS':
            return {
                ...state,
                'showNextAtts': !state.showNextAtts
            }
        default:
            return state;
    }
}