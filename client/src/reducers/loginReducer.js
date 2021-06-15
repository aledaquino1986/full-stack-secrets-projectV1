const initialState = {
  username: "",
  password: ""
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USERNAME":
      return {
        ...state,
        username: action.username
      };
    case "ADD_PASSWORD":
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
};

export { initialState, loginReducer };
