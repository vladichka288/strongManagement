import React, { Component } from "react";
import classes from "./Reports.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ReportComponent from "../../components/Report/Report";
class Reports extends Component {
  componentDidMount() {
    this.props.onUploadReports(this.props.userId, this.props.token);
  }
  render() {
    let reports = null;
    reports = this.props.reports.map((report, index) => (
      <ReportComponent
        index={index}
        link={report.answer}
        name={report.name}
        description={report.description}
      />
    ));
    return <div className={classes.TasksArrayContainer}>{reports}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    tasks: state.tasks.tasks,
    reports: state.reports.reports,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadReports: (ownerId, token) =>
      dispatch(actions.uploadReports(ownerId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
