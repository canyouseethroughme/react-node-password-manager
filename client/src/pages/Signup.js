import React, { useState } from "react";
import { register } from "../networking/users";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatpass] = useState("");
  const history = useHistory();

  const signupUser = async (e) => {
    try {
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
        history.push("/");
        window.location.reload();
      }
    } catch (e) {
      console.log("There is a problem creating your account & ", e);
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
          type="text"
          placeholder="First Name*"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name*"
          onChange={(e) => setLastname(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email*"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password*"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Repeat password*"
          onChange={(e) => setRepeatpass(e.target.value)}
        />
        <Button onClick={signupUser} name="Create account" />
      </form>
    </div>
  );
}
