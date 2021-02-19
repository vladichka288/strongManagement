import React from "react";
import classes from "./Button.module.css";
const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={[
        classes.Button,
        classes[props.btnType],
        classes[props.myClass],
      ].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default button;
