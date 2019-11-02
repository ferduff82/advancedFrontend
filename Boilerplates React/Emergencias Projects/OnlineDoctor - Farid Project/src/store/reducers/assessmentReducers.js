const initialState = {
    selectedSymptoms: [],
    selectedQuestions: [],
    questionsToDo: [],
    currentQuestion: {title: '', answers: []},
    answers: "",
    answersId: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SYMPTOM':
            return { ...state,
                'selectedSymptoms': [...state.selectedSymptoms, action.payload] }
        case 'REMOVE_SYMPTOM_TAG':
            return { ...state,
                'selectedSymptoms': action.payload }
        case 'SET_SELECTED_QUESTIONS':
            return { ...state,
                'selectedQuestions': action.payload }
        case 'SET_QUESTIONS_TODO': 
            return { ...state,
                'questionsToDo': action.payload }
        case 'SET_CURRENT_QUESTION':
            return { ...state,
                'currentQuestion': action.payload}
        case 'SAVE_ANSWERS':
            return { ...state,
                'answers': state.answers.concat(action.payload) }
        case 'SAVE_ANSWERS_ID':
            return { ...state,
                'answersId': action.payload }
        case 'CLEAN_ASSESTMENT':
            return {
                initialState
            }
        default:
            return state
    }
}