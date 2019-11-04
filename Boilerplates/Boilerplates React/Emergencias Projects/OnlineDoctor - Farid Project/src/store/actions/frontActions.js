export function modalOpen(action) {
  return {
      type: 'OPEN_MODAL',
      payload: true,
      action: action
  }
}

export function modalClose() {
  return {
      type: 'CLOSE_MODAL',
      payload: true
  }
}

export function sidebarSecOpen() {
  return {
    type: 'SIDEBAR_SEC_OPEN',
    payload: true
  }
}

export function sidebarSecClose() {
  return {
    type: 'SIDEBAR_SEC_CLOSE',
    payload: false
  }
}

export function sidebarFirstOpen() {
  return {
    type: 'SIDEBAR_FIRST_OPEN',
    payload: true
  }
}

export function sidebarFirstClose() {
  return {
    type: 'SIDEBAR_FIRST_CLOSE',
    payload: false
  }
}


export function appointAction(payload) {
  return {
    type: 'SET_APPOINT_ACTION',
    payload: payload
  }
}