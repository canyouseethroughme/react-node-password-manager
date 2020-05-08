import React from "react";
import styled from "styled-components";

const Buttones = styled.button`
  margin-top: 20px;
  background-color: #bababa;
  height: 30px;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-left: 2px solid lightgray;
  border-top: 2px solid lightgray;
  font-size: 15px;
  outline: none;

  :active {
    transform: translateY(2px);
  }
`;

export default function Button(props) {
  return <Buttones onClick={props.onClick}>{props.name}</Buttones>;
}
