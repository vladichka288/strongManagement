import React, { Component } from "react";
import TaskComponent from "./TaskConponent/TaskComponent";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class MyTasks extends Component {
  componentDidMount() {
    this.props.getWorksTasks(this.props.userId, this.props.token);
  }

  showWorks = () => {
    let MyWorks;
    if (this.props.worksTasks) {
      MyWorks = this.props.worksTasks.map((i, index) => {
        // console.log(i);
        return <TaskComponent info={i} key={i.id} index={index}/>;
      });
    } else {
      MyWorks = <div>None</div>;
    }

    return MyWorks;
  };

  render() {
    return <>{this.showWorks()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    worksTasks: state.works.worksTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWorksTasks: (userId, token) =>
      dispatch(actions.getWorksTasks(userId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
