
import _ from 'lodash';

const initialState = {
  modalHandler: false,
  isLoading: false,
  hasErrored: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_MODAL':
      return Object.assign({}, state, {
        modalHandler: action.payload
      })
    case 'HANDLE_LOADING':
      return Object.assign({}, state, {
        isLoading: action.displayChatLoading
      })
    default:
      return state
  }
}
