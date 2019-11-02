const initialState = {
    salatoken: {sala: '', token: ''},
    call: false
  }

  export default function callReducers(state = initialState, action) {
    switch (action.type) {
        case 'SET_SALATOKEN':
            return { ...state, salatoken: action.payload };
        case 'START_CALL':
            return { ...state, call: true }
        case 'FINISH_CALL':
            return { ...state, call: false }
        default:
            return state;
    }
  }