import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createpost/CreatePost";
import Post from "./pages/post/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/write-secret">
            <CreatePost />
          </Route>
          <Route exact path="/post/:id">
            <Post />
          </Route>
        </Switch>
        <Route exact path="/users/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
