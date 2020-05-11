import React, { useState, useEffect } from "react";
import { createPassword, getPasswords } from "../networking/passwords";
import { setAuthToken } from "../networking/HTTPservice";
import Input from "../components/Input";
import Button from "../components/Button";
import PassList from "../components/PassList";
import Title from "../components/Title";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 25vh;
`;

export default function PasswordManager() {
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  const addAccount = async (e) => {
    e.preventDefault();
    await createPassword({ account, username, password });
    // console.log(newAccount);
    const form = document.querySelector("form");
    form.reset();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    getPasswordList();
  }, []);

  const getPasswordList = async () => {
    const { data } = await getPasswords();
    console.log("====================================");
    console.log("data here l ", data.passwords);
    console.log("====================================");
    const list = data.passwords;
    setPasswordList(list);
  };

  return (
    <div>
      <Form>
        <Title title="Add new accounts" />
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
        <Button onClick={addAccount} name="Add account" />
      </Form>
      <Title title="Existing accounts" />
      {passwordList.map((item) => (
        <PassList
          key={item.id}
          account={item.account}
          username={item.username}
          password={item.password}
        />
      ))}
    </div>
  );
}
