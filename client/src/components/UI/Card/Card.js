import React from "react";
import classes from "./Card.module.css"
const Card = function (props) {
  return (
    <React.Fragment>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap');
      </style>
      <div className={classes.Card} /*style={{ width: props.width }}*/>
        <div className={classes.Title}>{props.titleName}</div>
        {props.children}
      </div>
    </React.Fragment>
  );
};
export default Card;
