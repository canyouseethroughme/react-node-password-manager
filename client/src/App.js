import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import { setAuthToken } from "./networking/HTTPservice";

import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordManager from "./pages/PasswordManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const checkedLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    return token ? true : false;
  };

  useEffect(() => {
    setIsLoggedIn(checkedLoggedIn);
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  history.push("/");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Switch>
        {!isLoggedIn && (
          <Route exact path="/">
            <Login />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/sign-up">
            <Signup />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/passwords">
            <PasswordManager />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
