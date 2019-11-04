
import { HANDLE_LOADING } from '../../constants/ActionTypes';

export function showLoaderChat() {
  return {
    type: HANDLE_LOADING,
    displayChatLoading: true
  }
}

export function hideLoaderChat() {
  return {
    type: HANDLE_LOADING,
    displayChatLoading: false
  }
}
