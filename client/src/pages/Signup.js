import React, { useState } from "react";
import { register } from "../networking/users";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatpass] = useState("");

  const signupUser = async (e) => {
    e.preventDefault();
    if (password !== repeatedPassword || password.length < 7) {
      console.log("something aint right");
    } else {
      const { data } = await register({
        username,
        firstName,
        lastName,
        email,
        password,
        repeatedPassword,
      });
      console.log("====================================");
      console.log("register data", data);
      console.log("====================================");
      const form = document.querySelector("form");
      form.reset();
    }
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Repeat password"
        onChange={(e) => setRepeatpass(e.target.value)}
      />
      <button onClick={signupUser}>Sign up</button>
    </form>
  );
}
