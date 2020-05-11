import React, { useState } from "react";
import { forgotPass } from "../networking/users";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      await forgotPass({ email });
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        history.push("/");
        window.location.reload();
      }, 2000);
    } catch (e) {
      console.log("There is a problem with login. Error: ", e);
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
          type="email"
          placeholder="Email*"
          onChange={(e) => setEmail(e.target.value)}
        />
        {loading ? (
          <Button name="Sending.." />
        ) : (
          <Button onClick={sendEmail} name="Send email" />
        )}
      </form>
    </div>
  );
}
