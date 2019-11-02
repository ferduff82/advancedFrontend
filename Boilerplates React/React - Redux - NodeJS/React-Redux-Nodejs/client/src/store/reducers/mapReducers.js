import { LOAD_MARKER_INFO } from "../../constants/ActionTypes";


const initialState = {
    loading: false,
    marker_selected:{},
    cluster_selected:[],
    sidebar:{open: false},
    active_users:[],
  }
  
  export default (map = initialState, action) => {
    switch (action.type) {
      case LOAD_MARKER_INFO:
       return action.payload
      case 'ADD_MARKER':
        return Object.assign({}, map, {
          marker_selected: action.payload
        })
      case 'SIDEBAR_CLOSE':
        return Object.assign({}, map, {
          sidebar: {open: action.payload}
        }) 
      case 'SIDEBAR_OPEN':
        return Object.assign({}, map, {
          sidebar: {open: action.payload}
        }) 
      case 'SET_USERS_AUTH':
        return {...map ,  active_users: action.payload }
      default:
       return map
      }
  }
  