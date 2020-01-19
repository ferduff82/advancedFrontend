const initialState = {
    assignations: [],
    providers: [],
    all: [],
    currentId: "",
    current: [],
    done: [],
    provider: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ASSIGNS':
            return {
                ...state,
                'all': action.payload
            }
        case 'GET_APPOINT':
            return {
                ...state,
                'selected': action.payload
            }
        case 'GET_PROVIDER':
            return {
                ...state,
                'provider': action.payload
            }
        case 'GET_CURRENT_ID':
            return {
                ...state,
                'currentId': action.payload
            }
        case 'GET_CURRENT_ATT':
            return {
                ...state,
                'current': action.payload
            }
        case 'GET_DONE_ATT':
            return {
                ...state,
                'done': action.payload
            }
        default:
            return state
    }
}