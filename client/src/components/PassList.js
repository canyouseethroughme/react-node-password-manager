import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function PassList(props) {
  return (
    <div>
      <Input type="text" placeholder={props.account} disabled />
      <Input type="text" placeholder={props.username} disabled />
      <Input type="text" placeholder={props.password} disabled />
      <Button name="Edit" />
      <Button name="Delete" />
    </div>
  );
}
