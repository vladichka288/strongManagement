import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./TaskComponent.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { withRouter } from "react-router-dom";
class TaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
    };
  }

  cancelDelete = () => {
    this.setState({
      delete: !this.state.delete,
    });
  };
  leaveWorkClick = () => {
    this.props.onLeaveWork(
      this.props.info.id,
      this.props.userId,
      this.props.token
    );
  };
  redirectClick = () => {
    this.props.history.push(`selectedTasks?workId=${this.props.info.id}`);
  };

  render() {
    return (
      <li className={classes.Work}>
          <div className={classes.number}>#{this.props.index+1}</div>
        <div className={classes.TopWorkHeader}>
          <div className={classes.RemoveWork} onClick={this.cancelDelete}>
            <i className={"fas fa-door-open"}></i>
          </div>
          <div className={classes.Label}>{this.props.info.name}</div>
        </div>
        <div className={classes.Description}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
          </style>
          {this.props.info.description}
        </div>
        <div className={classes.UserGroup}>
          <div> Workers:</div>
          <div>
            <i class="fa fa-users" aria-hidden="true"></i>
          </div>
          <div>
            <font className={classes.UsersGroupValue}>
              {this.props.info.workers.length
                ? this.props.info.workers.length
                : 0}
            </font>
          </div>
        </div>
        <div onClick={this.redirectClick} className={classes.TaskGroup}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
          </style>
          <div>Tasks:</div>
          <div className={classes.TaskGroupValue}>
            <i class="fas fa-tasks"></i>
          </div>
          <div className={classes.TaskGroupValue}>
            {this.props.info.tasks.length}
          </div>
        </div>
        <div
          className={
            this.state.delete
              ? [classes.active, classes.DeleteContainer].join(" ")
              : classes.DeleteContainer
          }
        >
          <div className={classes.container}>
            <h1>Leave Work</h1>
            <p className={classes.confirm}>
              Are you sure you want to leave your work?
            </p>
            <div className={classes.clearfix}>
              <button
                type="button"
                onClick={this.cancelDelete}
                className={classes.cancelbtn}
              >
                Cancel
              </button>
              <button
                onClick={this.leaveWorkClick}
                type="button"
                className={classes.deletebtn}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    redirect: state.auth.redirect,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLeaveWork: (workId, userId, token) =>
      dispatch(actions.leaveWork(workId, userId, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TaskComponent));
