import React, { useReducer } from "react";
import { loginReducer, initialState } from "../../reducers/loginReducer";
import { useHistory } from "react-router";

const Register = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const history = useHistory();

  const submitLogin = e => {
    e.preventDefault();

    fetch("/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: state.username,
        password: state.password
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFormChange = (e, type) => {
    const { name, value } = e.target;
    dispatch({ type: type, [name]: value });
  };

  return (
    <div className="login-container">
      <form onSubmit={submitLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={e => handleFormChange(e, "ADD_USERNAME")}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={e => handleFormChange(e, "ADD_PASSWORD")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
