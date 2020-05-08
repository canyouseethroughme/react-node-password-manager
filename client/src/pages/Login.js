import React, { useState } from "react";
import { login } from "../networking/users";
import { setAuthToken } from "../networking/HTTPservice";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const { data } = await login({ username, password });
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);
      const form = document.querySelector("form");
      form.reset();
      console.log("====================================");
      console.log("login data", data);
      console.log("====================================");
      history.push("/passwords");
      window.location.reload();
    } catch (e) {
      console.log("There is a problem with login||", e);
    }
  };
  const wrapperStyle = {
    width: "100vw",
    marginTop: "30vh",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: ".5rem",
  };
  return (
    <div style={wrapperStyle}>
      <form style={formStyle}>
        <Input
          type="text"
          placeholder="Username*"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password*"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={loginUser} name="Login" />
      </form>
    </div>
  );
}
