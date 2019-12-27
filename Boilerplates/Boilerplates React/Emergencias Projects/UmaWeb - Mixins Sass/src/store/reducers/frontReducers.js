
const initialState = {
  alert: {
    active: false,
    type: "success",
    title: "",
    msg: ""
  },
};

export default function frontReducers(state = initialState, action) {
  switch (action.type) {
    case "ALERT":
      return {
        ...state,
        alert: {
          active: !state.alert.active,
          type: action.payload.type,
          title: action.payload.title,
          msg: action.payload.msg
        }
      };
    default:
      return state;
  }
}
