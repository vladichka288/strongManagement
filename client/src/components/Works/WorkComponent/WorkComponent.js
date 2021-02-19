import React, { Component } from "react";
import classes from "./WorkComponent.module.css";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { Redirect, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class WorkComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      delete: false,
    };
  }

  cancelDelete = () => {
    console.log("pyk");
    this.setState({
      delete: !this.state.delete,
    });
  };
  removeWork = (workId) => {
    this.props.onRemoveWork(workId, this.props.token, this.props.works);
  };
  redirectClick = () => {
    this.props.history.push(`selectedWorkers?workId=${this.props.workId}`);
  };

  render() {
    console.log(this.props);

    let redirect = null;
    if (this.props.redirectWork) {
      redirect = <Redirect to={this.props.redirectWork} />;
    }
    return (
      <li className={classes.Work}>
          <div className={classes.number}>#{this.props.index+1}</div>
        <div className={classes.TopWorkHeader}>
          <div className={classes.RemoveWork} onClick={this.cancelDelete}>
            <i class="fas fa-trash-alt"></i>
          </div>
          <div className={classes.Label}>{this.props.name}</div>
        </div>
        <div className={classes.Description}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
          </style>
          {this.props.description}
        </div>

        <div className={classes.Password}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Andika+New+Basic:ital@1&display=swap');
          </style>
          <div>password:</div>
          <div className={classes.PasswordFont}>{this.props.password}</div>
          <CopyToClipboard onCopy={this.props.copyFunc} text={this.props.password}>
            <div className={classes.clipBoard}>
              <i class={"far fa-copy"}></i>
            </div>
          </CopyToClipboard>
        </div>
        <div onClick={this.redirectClick} className={classes.Users}>
          <div className={classes.UserGroup}>
            <i class="fa fa-users" aria-hidden="true">
              :
            </i>
            <font className={classes.UsersGroupValue}>
              {this.props.workers ? this.props.workers.length : 0}
            </font>
          </div>
          <div className={classes.UserGroup}>
            <i class="fas fa-user-tie">:</i>
            <font className={classes.UsersGroupValue}>0</font>
          </div>
          <div className={classes.UserGroup}>
            <i class="fas fa-hospital-user">:</i>
            <font className={classes.UsersGroupValue}>0</font>
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
            <h1>Delete Work</h1>
            <p>Are you sure you want to delete your work?</p>

            <div className={classes.clearfix}>
              <button
                type="button"
                onClick={this.cancelDelete}
                className={classes.cancelbtn}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => this.removeWork(this.props.workId)}
                className={classes.deletebtn}
              >
                Delete
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
    works: state.works.works,
    redirectWork: state.works.redirectWork,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveWork: (id, token, oldWorks) =>
      dispatch(actions.removeWork(id, token, oldWorks)),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
    setRedirectWorkPath: (path) => dispatch(actions.setRedirectWorkPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WorkComponent));
