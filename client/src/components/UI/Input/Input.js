import React from "react";
import classes from "./Input.module.css";
import classesTwo from "../../../containers/Works/CreateWork/CreateWork.module.css";
function Input(props) {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input": {
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    }
    case "textarea": {
      inputElement = (
        <textarea
        rows="10" cols="20"
          id={classesTwo.style1}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((element) => {
            return (
              <option key={element.value} value={element.value}>
                {element.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    }
    default:
      inputElement = (
        <input
          onChange={props.Changed}
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          placeholder={props.elementConfig.placeholder}
          type={props.elementConfig.type}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap');
      </style>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}
export default Input;
