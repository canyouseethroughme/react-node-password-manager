import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import { setAuthToken } from "./networking/HTTPservice";

import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotUserPassword from "./pages/ForgotUserPassword";
import UpdateUserPassword from "./pages/UpdateUserPassword";
import PasswordManager from "./pages/PasswordManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [link, setLink] = useState("login");
  const history = useHistory();

  const checkedLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    return token ? true : false;
  };

  const swapLinks = (newLink) => {
    setLink(newLink);
  };

  useEffect(() => {
    setIsLoggedIn(checkedLoggedIn);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const navStyle = {
    width: "100vw",
    position: "absolute",
    bottom: "16vh",
    margin: "auto",
  };
  const ulStyle = {
    listStyleType: "none",
    padding: 0,
  };

  return (
    <div className="App">
      <nav style={navStyle}>
        <ul style={ulStyle}>
          {link === "signup"
            ? !isLoggedIn && (
                <li>
                  <Link to="/" onClick={() => swapLinks("login")}>
                    Already have an account? Click here to <span>login</span>.
                  </Link>
                </li>
              )
            : !isLoggedIn && (
                <li>
                  <Link to="/sign-up" onClick={() => swapLinks("signup")}>
                    Don't have an account? Click here to <span>sign up</span>.
                  </Link>
                </li>
              )}
          {!isLoggedIn && (
            <li>
              <Link to="/forgot-password">
                Forgot your password? Click here to <span>reset it</span>.
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logout}>Logout</button>
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
        {!isLoggedIn && (
          <Route path="/forgot-password">
            <ForgotUserPassword />
          </Route>
        )}

        <Route path="/update-password/:token">
          <UpdateUserPassword />
        </Route>

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
