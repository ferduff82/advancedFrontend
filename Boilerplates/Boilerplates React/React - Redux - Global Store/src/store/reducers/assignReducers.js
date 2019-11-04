const initialState = {
    assignations: [],
    providers: []
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
        default:
        return state
    }
}