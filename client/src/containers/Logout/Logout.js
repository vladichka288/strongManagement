import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Logout extends Component {
  componentDidMount() {
    console.log("Logout");
    document.cookie = `userManagement=null`;
    document.cookie = `tokenManagement=null`;
    this.props.onLogout();
    this.props.setRedirectPath("/login");
  }
  render() {
    return <Redirect to={this.props.redirect} />;
  }
}
const mapStateToProps = (state) => {
  return {
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
