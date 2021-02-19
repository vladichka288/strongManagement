import classes from "./Task.module.css";
import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
const Task = (props) => {
  const [inputReport, setReport] = useState("");

  const sendReport = () => {
    props.onSendArticle(
      props.token,
      props.taskId,
      inputReport,
      props.name,
      props.description,
      props.ownerId
    );
  };
  const inputHandler = (event) => {
    setReport(event.target.value);
  };

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
        <input
          value={inputReport}
          onChange={(event) => inputHandler(event)}
          placeholder="https://docs.google.com/document/u/0/"
        />
      </div>
      <button onClick={sendReport} className={classes.SendArticle}>
        Send Report
      </button>
    </li>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.tasks.error,
    loading: state.tasks.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSendArticle: (token, taskId, googleLink, name, description, ownerId) =>
      dispatch(
        actions.sendArticle(
          token,
          taskId,
          googleLink,
          name,
          description,
          ownerId
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
