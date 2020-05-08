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
  };
  return (
    <form>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
    </form>
  );
}
