import React, { useState } from "react";
import { createPassword } from "../networking/passwords";

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
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Account name"
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="text"
          placeholder="User name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addAccount}>Add</button>
      </form>
    </div>
  );
}
