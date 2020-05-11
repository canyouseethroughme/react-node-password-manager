import React, { useState } from "react";
import { updatePass } from "../networking/users";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

export default function UpdateUserPassword() {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const resetPassword = (e) => {
    try {
      if (password === repeatedPassword) {
        e.preventDefault();
        const token = window.location.href.split("/")[4];
        updatePass(token, { newPassword: password });
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      setTimeout(function () {
        setLoading(true);
      }, 2000);
      console.log("There is a problem with login. Error: ", err);
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
          type="password"
          placeholder="New Password*"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Repeat new password*"
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
        {loading ? (
          <Button onClick={resetPassword} name="Reset password" />
        ) : (
          <Button name="Wait.." />
        )}
      </form>
    </div>
  );
}
