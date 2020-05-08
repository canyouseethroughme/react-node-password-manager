import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordManager from "./pages/PasswordManager";

function App() {
  return (
    <div className="App">
      <Login />
      <Signup />
    </div>
  );
}

export default App;
