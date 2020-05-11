import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { updatePassword, deletePassword } from "../networking/passwords";

export default function PassList(props) {
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(props.username);
  const [password, setPassword] = useState(props.password);

  return (
    <div>
      <Input type="text" value={props.account} disabled />
      <Input
        type="text"
        value={user}
        disabled={editable ? false : true}
        onChange={(e) => setUser(e.target.value)}
      />
      <Input
        type="text"
        value={password}
        disabled={editable ? false : true}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        name={editable ? "Save" : "Edit"}
        onClick={
          editable
            ? () => {
                updatePassword(props.id, { username: user, password });
                setEditable(!editable);
              }
            : () => setEditable(!editable)
        }
      />
      <Button
        name="Delete"
        onClick={() => {
          deletePassword(props.id);
          props.onDelete(props.id);
        }}
      />
    </div>
  );
}
