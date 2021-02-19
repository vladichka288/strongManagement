import classes from "./Reports.module.css";
import React from "react";
const report = (props) => {
  return (
    <li key={props.index + 1} className={classes.taskItem}>
      <div className={classes.number}>#{props.index + 1}</div>
      <h2>
        <span>Name: </span>
        {props.name}
      </h2>
      <p>
        <span>Description: </span>
        {props.description}
      </p>
      <div className={classes.LinkInput}>
        <span>Link: </span>
        {props.link}
      </div>
    </li>
  );
};

export default report;
