const initialState = {
    assignations: [{}],
    providers: [],
    match: {},
    all: [{}],
    selected: {},
    appointments: [],
    actionHandler: '',
    nextAppointment: "",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ASSIGNS':
            return { ...state,
                'all': action.payload
            }
        case 'GET_APPOINT':
            return { ...state,
                'selected': action.payload
            }
        case 'MATCH_TO_STORE':
            return { ...state,
                'match': action.payload }
        case 'CONFIRMED_APPOINTMENT':
            return { ...state,
                'confirmedAppoint': action.payload }
        case 'SAVE_ASSIGN':
            return { ...state,
                'appointments': action.payload
            }
        case 'REMOVE_APPOINT':
            return { ...state,
                'appointments': action.payload }
        case 'SET_NEXT_APPOINTMENT':
            return { ...state,
                'nextAppointment': action.payload}
        default:
        return state
    }
}