import React, { useEffect, useCallback } from "react";
import classes from "./NavigationItem.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions/index";
import { NavLink } from "react-router-dom";
import { useSocket } from "../../../../../contexts/SocketProvider";
const NavigationItem = (props) => {
  const updateTaskCount = useCallback(() => {
    props.getTasksNumber(props.token, props.userId);
  }, [props.token, props.userId]);
  const socket = useSocket();
  useEffect(() => {
    if (props.token && props.link == "/myTasks") {
      if (socket == null) {
        return;
      }
      console.log(`BALABAM userId= ${props.userId}`);
      socket.on("update-task", updateTaskCount);
      return () => socket.off("update-task");
    }
  }, [socket, props.token, props.link, updateTaskCount]);

  let notification = null;
  if (props.link == "/myTasks" && props.countTasks > 0) {
    notification = <span className={classes.number}>{props.countTasks}</span>;
  }
  return (
    <li onClick={props.myRef} className={classes.NavigationItem}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
      </style>
      <NavLink to={props.link} exact activeClassName={classes.active}>
        {props.children}
        {notification}
      </NavLink>
    </li>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    countTasks: state.tasks.countTasks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTasksNumber: (token, userId) =>
      dispatch(actions.getTasksNumber(token, userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItem);

// export default NavigationItem;
