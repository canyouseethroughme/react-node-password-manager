import React from "react";
import styled from "styled-components";

const Inputs = styled.input`
  width: 200px;
  height: 26px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  padding-left: 6px;
  outline: none;
  font-size: 13px;

  ::placeholder {
    color: black;
  }
`;

export default function Input(props) {
  return (
    <Inputs
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
}
