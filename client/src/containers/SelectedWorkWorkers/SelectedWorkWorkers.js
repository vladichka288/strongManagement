import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserComponent from "../../components/User/User";
import classes from "./SelectedWorkWorkers.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
class SelectedWorkWorkers extends Component {
  state = {
    workId: "lol",
  };
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const workId = params.get("workId");
    this.setState({ workId: workId });
    if (this.props.jobWorkers.length != 0) {
      this.props.onSetEmptyWorkers();
    }
    this.props.onUploadWorkers(workId, this.props.userId, this.props.token);
  }
  render() {
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    let error = null;
    if (this.props.error) {
      error = <div>{this.props.error}</div>;
    }
    console.log(this.props.jobWorkers);

    let workersToRender = this.props.jobWorkers.map((worker) => {
      return (
        <UserComponent
          selectedUserId={worker.userId}
          userName={worker.nickname}
          userRating={"high"}
          userTasks={2}
          workId={this.state.workId}
          avatar={worker.avatar ? worker.avatar : null}
        />
      );
    });
    return (
      <React.Fragment>
        {error}
        {spinner}
        <ul className={classes.UserList}>{workersToRender}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.jobWorkers.error,
    redirect: state.auth.redirect,
    loading: state.jobWorkers.loading,
    jobWorkers: state.jobWorkers.workers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (login, password) => dispatch(actions.login(login, password)),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
    onUploadWorkers: (workId, userId, token) =>
      dispatch(actions.uploadWorkers(workId, userId, token)),
    onSetEmptyWorkers: () => dispatch(actions.setEmptyWorkers()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedWorkWorkers);
