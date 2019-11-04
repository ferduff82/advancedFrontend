
export const HANDLE_DROPDOWN = 'OPEN_DROPDOWN';

export function openDropdown(dataOpen) {
  return {
    type: HANDLE_DROPDOWN,
    payload: dataOpen
  }
}
