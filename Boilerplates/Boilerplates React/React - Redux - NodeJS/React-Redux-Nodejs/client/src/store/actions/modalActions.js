// PUEDE SER SOLO UNA CONSTANTE
export const HANDLE_MODAL = 'HANDLE_MODAL'

export function showModal() {
  return {
    type: HANDLE_MODAL,
    payload: true
  }
}

export function hideModal() {
  return {
    type: HANDLE_MODAL,
    payload: false
  }
}