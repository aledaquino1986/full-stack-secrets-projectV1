export const initialState = {
  title: "",
  titleErrorMessage: "The title should have at least 10 characters",
  isTitleValid: false,
  showTitleError: false,
  secretText: "",
  secretTextErrorMessage: "The secret should be of at least 15 characters",
  isSecretTextValid: false,
  showisSecretTextError: false,
  userName: "",
  userNameErrorMessage: "The username should be of at least 5 characters",
  isUserNameValid: false,
  showIsUserNameValidError: false,
  canSendForm: false
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FORM":
      return {
        ...state,
        ...action
      };

    case "ADD_ERROR":
      return {
        ...state,
        ...action
      };
    case "SHOW_TEXTERROR":
      return {
        ...state,
        ...action
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
