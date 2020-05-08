import React, { useState, useEffect } from "react";
import { createPassword, getPasswords } from "../networking/passwords";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "styled-components";

export default function PasswordManager() {
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addAccount = async (e) => {
    e.preventDefault();
    const newAccount = await createPassword({ account, username, password });
    console.log(newAccount);
    const form = document.querySelector("form");
    form.reset();
  };
  useEffect(() => {
    const data = getPasswords();
    console.log(data);
  }, []);

  const Form = styled.form`
    margin-top: 25vh;
  `;

  return (
    <div>
      <Form>
        <Input
          type="text"
          placeholder="Account name"
          onChange={(e) => setAccount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="User name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={addAccount} name="Add new account" />
      </Form>
      {/* <button
        onClick={async () => {
          const data = await getPasswords();
          console.log(data);
        }}
      >
        button
      </button> */}
    </div>
  );
}
