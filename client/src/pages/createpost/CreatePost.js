import React, { useReducer, useContext } from "react";
import { formReducer, initialState } from "../../reducers/formReducer";
import { useHistory } from "react-router-dom";

import "./createpost.css";
import { AuthContext } from "../../context/AuthContext";

const CreatePost = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  const handleFormChange = (e, typeOfError) => {
    const { name, value } = e.target;
    dispatch({ type: "ADD_FORM", [name]: value });
    validateInput(name, value, typeOfError);
  };

  const onFormSubmit = e => {
    const { secretText, title } = state;
    e.preventDefault();

    if (secretText.length >= 15 && title.length >= 10) {
      fetch("/posts", {
        method: "POST",
        body: JSON.stringify({
          secretText,
          title,
          username: authState.username
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(() => {
          dispatch({ type: "RESET" });
          history.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const validateInput = (type, value, typeOfError) => {
    if (type === "title") {
      value.length >= 10
        ? dispatch({ type: "ADD_ERROR", [typeOfError]: true })
        : dispatch({ type: "ADD_ERROR", [typeOfError]: false });
    }

    if (type === "secretText") {
      value.length >= 5
        ? dispatch({ type: "ADD_ERROR", [typeOfError]: true })
        : dispatch({ type: "ADD_ERROR", [typeOfError]: false });
    }
  };

  const onBlurErrorEffect = (
    inputText,
    inputTextLength,
    isTextValid,
    showIsTextValid
  ) => {
    inputText.length >= inputTextLength
      ? dispatch({
          type: "ADD_ERROR",
          [isTextValid]: true,
          [showIsTextValid]: false
        })
      : dispatch({
          type: "ADD_ERROR",
          [isTextValid]: false,
          [showIsTextValid]: true
        });
  };

  const onFocusEffect = (inputText, maxInputTextLength, showIsTextValid) => {
    inputText.length < maxInputTextLength &&
      inputText.length > 0 &&
      dispatch({ type: "SHOW_TEXTERROR", [showIsTextValid]: true });
  };

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <label htmlFor="title">Title</label>
      {!state.isTitleValid && state.showTitleError && (
        <p>{state.titleErrorMessage}</p>
      )}
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Give your secret a title"
        value={state.title}
        onChange={e => handleFormChange(e, "isTitleValid")}
        onFocus={() => onFocusEffect(state.title, 10, "showTitleError")}
        onBlur={() =>
          onBlurErrorEffect(state.title, 10, "isTitleValid", "showTitleError")
        }
      />
      <label htmlFor="secret">Secret</label>
      {!state.isSecretTextValid && state.showisSecretTextError && (
        <p>{state.secretTextErrorMessage}</p>
      )}
      <textarea
        type="text"
        id="secret"
        name="secretText"
        placeholder="Tell us your secret!"
        value={state.secretText}
        onChange={e => handleFormChange(e, "isSecretTextValid")}
        onFocus={() =>
          onFocusEffect(state.secretText, 15, "showisSecretTextError")
        }
        onBlur={() =>
          onBlurErrorEffect(
            state.secretText,
            15,
            "isSecretTextValid",
            "showisSecretTextError"
          )
        }
      />

      <button
        type="submit"
        disabled={
          state.secretText.length >= 15 && state.title.length >= 10
            ? false
            : true
        }
      >
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
