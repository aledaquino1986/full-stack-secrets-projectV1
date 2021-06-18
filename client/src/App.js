import "./App.css";
import React from "react";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createpost/CreatePost";
import Post from "./pages/post/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [authState, setAuthState] = React.useState({
    username: "",
    id: 0,
    status: false
  });

  React.useEffect(() => {
    fetch("/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setAuthState({
            ...authState,
            status: false
          });
        } else {
          setAuthState({
            username: data.username,
            id: data.id,
            status: true
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/write-secret">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <Post />
            </Route>
          </Switch>
          <Route path="/users/login">
            <Login />
          </Route>

          <Route path="/users/register">
            <Register />
          </Route>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
