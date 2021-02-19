import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./SelectedTasks.module.css";
import TaskComponent from "../../components/Task/Task";
class SelectedTasks extends Component {
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const workId = params.get("workId");
    this.props.onUploadSelectedTasks(
      workId,
      this.props.userId,
      this.props.token
    );
  }
  render() {
    let tasks = null;
    tasks = this.props.tasks.map((task, index) => (
      <TaskComponent
        index={index}
        taskId={task.id}
        ownerId={task.ownerId}
        name={task.name}
        description={task.description}
      />
    ));
    return <div className={classes.TasksArrayContainer}>{tasks}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadSelectedTasks: (workId, userId, token) =>
      dispatch(actions.uploadSelectedTasks(workId, userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTasks);
