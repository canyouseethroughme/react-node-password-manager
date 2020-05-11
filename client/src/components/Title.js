import React from "react";

export default function Title(props) {
  const style = {
    marginTop: "3rem",
    marginBottom: "0",
  };
  return <h3 style={style}>{props.title}</h3>;
}
