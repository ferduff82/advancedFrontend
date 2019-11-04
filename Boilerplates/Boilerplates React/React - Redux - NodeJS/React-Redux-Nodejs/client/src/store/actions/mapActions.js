
export function addMarker(marker) {
    return {
      type: 'ADD_MARKER',
      payload: marker
    }
  }

export function sidebarOpen() {
    return {
      type: 'SIDEBAR_OPEN',
      payload: true
    }
}

export function sidebarClose() {
  return {
    type: 'SIDEBAR_CLOSE',
    payload: false
  }
}


export function setUsersAuth(list) {
  return {
    type: 'SET_USERS_AUTH',
    payload: list
  }
}