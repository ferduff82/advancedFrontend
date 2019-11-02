const initialState = {
    loading: false,
    checkStatus: 0,
    dinamic: {whenDinamic: false, queueDinamic: true},
    sidebar: {first: false, second: false},
    modal: false,
    otherReason: false,
    answerQuestions: false,
    paginationTransport: 1,
    showAskText: true,
    nextQuestion: "",
    currentQuestion: 0,
    openDetails: false,
    vmdStage: "who",
    remainingText: ""
  }

  export default function frontReducers(state = initialState, action) {
    switch (action.type) {
        case 'LOADING':
            return{ ...state, loading: action.payload}
        case 'OPEN_MODAL':
            return {...state, modal: true, action: action.action};
        case 'CLOSE_MODAL':
            return {...state, modal: false, action: action.action};
        case 'ON_HOVER':
            return {...state, hover: action.payload};
        case 'OPEN_WHEN_DINAMIC':
            return {...state, dinamic: {whenDinamic: !state.dinamic.whenDinamic, queueDinamic: true}}
        case 'OTHER_REASON': 
            return {...state, otherReason: true }
        case 'CLOSE_QUEUE_DINAMIC':
            return {...state, dinamic: {queueDinamic: !state.dinamic.queueDinamic}}
        case 'NEXT_QUESTION':
            return {...state, nextQuestion: action.payload}
        case 'CURRENT_QUESTION':
            return {...state, currentQuestion: ++state.currentQuestion}
        case 'OPEN_QUESTIONS':
            return {...state, answerQuestions: action.payload}
        case 'SET_PAGINATION_TRANSPORT':
            return {...state, paginationTransport: action.payload}
        case 'SHOW_ASK_TEXT':
            return {...state, showAskText: action.payload}
        case 'TOGGLE_DETAIL':
            return {...state, openDetails: !state.openDetails}
        case 'EDIT_SECTION':
            return {...state, section: action.payload}
        case 'SIDEBAR_SEC_CLOSE':
                return Object.assign({}, state, {
                    sidebar: {second: action.payload}
                }) 
        case 'SIDEBAR_SEC_OPEN':
            return Object.assign({}, state, {
                sidebar: {second: action.payload, first: false}
            }) 
        case 'SIDEBAR_FIRST_CLOSE':
            return Object.assign({}, state, {
                sidebar: {first: action.payload}
            }) 
        case 'SIDEBAR_FIRST_OPEN':
            return Object.assign({}, state, {
                sidebar: {first: action.payload, second: false} 
            }) 
        case 'SET_APPOINT_ACTION': 
            return { ...state,
                'actionHandler': action.payload }
        case 'SET_STATUS': 
            return { ...state,
                'checkStatus': action.payload }
        case 'CLEAN_FRONT':
            return { ...state,
                'sidebar': {first: false, second: false},
                'actionHandler': ''
            }
        case 'SET_VMD_STAGE':
                return{ ...state, 'vmdStage': action.payload}
        case 'REMAINING_ATT_TIME':
                return { ...state, 
                    'remainingText': action.payload }
        default:
            return state;
    }
  }