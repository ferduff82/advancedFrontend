
const initialState = {
    cancelTripComments: ''
}

export default function cancelTrip(state = initialState, action) {
    switch (action.type) {
        case 'CANCEL_TRIP_COMMENTS':
            return { ...state, cancelTripComments: action.payload }
        default:
            return state;
    }
}
