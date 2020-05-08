import React, { useState } from "react";
import { login } from "../networking/users";
import { setAuthToken } from "../networking/HTTPservice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const { data } = await login({ username, password });
    setAuthToken(data.token);
    localStorage.setItem("token", data.token);
    const form = document.querySelector("form");
    form.reset();
    console.log("====================================");
    console.log("login data", data);
    console.log("====================================");
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
    </form>
  );
}
