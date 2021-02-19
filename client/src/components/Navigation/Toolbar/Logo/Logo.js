import React from "react";
import classes from "./Logo.module.css";
const logo = function (props) {
  return (
    <React.Fragment>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      </style>
      <div className={classes.Logo}>StrongManagment</div>
    </React.Fragment>
  );
};
export default logo;
