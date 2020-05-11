import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const addAccount = async (e) => {
    e.preventDefault();
    if (account.length > 3 && username.length > 3 && password.length > 3) {
      await createPassword({ account, username, password });
      getPasswordList();
      const form = document.querySelector("form");
      form.reset();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    getPasswordList();
  }, []);

  const getPasswordList = async () => {
    try {
      const { data } = await getPasswords();
      const list = data.passwords;
      setPasswordList(list);
    } catch (e) {
      localStorage.clear();
      history.push("/");
      window.location.reload();
    }
  };

  const deleteItem = (id) => {
    setPasswordList(passwordList.filter((x) => x.id !== id));
  };

  return (
    <div>
      <Form>
        <Title title="Add new accounts" />
        <Input
          type="text"
          placeholder="Account name*"
          onChange={(e) => setAccount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="User name*"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Password*"
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
          id={item.id}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
}
