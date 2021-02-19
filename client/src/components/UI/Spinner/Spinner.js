import React from "react";
import classes from './Spinner.module.css';
const Spinner = function (props) {
  return (
    <div className={classes.loader}>Loading...</div>
  );
};
export default Spinner;
