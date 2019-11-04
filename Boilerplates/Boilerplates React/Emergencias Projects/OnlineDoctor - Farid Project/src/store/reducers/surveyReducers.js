
const initialState = {
    stars: 0,
    starsDriver: 0,
    comments: ''
}

export default function frontReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_STARS_SURVEY':
            return { ...state, stars: action.payload }
        case 'ADD_STARS_DRIVER':
            return { ...state, starsDriver: action.payload }
        case 'ADD_COMMENTS_SURVEY':
            return { ...state, comments: action.payload }
        default:
            return state;
    }
}
