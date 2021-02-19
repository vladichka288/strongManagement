import React, { useCallback } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Auth from "./containers/Auth/Auth";
import About from "./components/About/About";
import Logout from "./containers/Logout/Logout";
import Works from "./containers/Works/Works";
import CreateWork from "./containers/Works/CreateWork/CreateWork";
import GetJob from "./containers/GetJob/GetJob";
import MyTasks from "./containers/Tasks/MyTasks";
import SelectedWorkWorkers from "./containers/SelectedWorkWorkers/SelectedWorkWorkers";
import SelectedTasks from "./containers/SelectedTasks/SelectedTasks";
import WorkersReports from "./containers/Reports/Reports";
import getCookie from "./functions/getCookie";
import Profile from "./containers/Profile/Profile";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SocketProvider } from "./contexts/SocketProvider";
const App = (props) => {
  useEffect(() => {
    console.log("again");

    if (document.cookie) {
      let cookies = getCookie(document.cookie);
      if (cookies.userId == "null" || cookies.token == "null") {
      } else {
        props.onAutoSignUp(cookies.userId, cookies.token);
      }
    }
  }, [document.cookie]);
  let routes = null;
  if (props.token) {
    console.log(props.userId);
    routes = (
      <Switch>
        <Route path="/workersReports" component={WorkersReports} />
        <Route path="/myTasks" component={MyTasks} />
        <Route path="/getJob" component={GetJob} />
        <Route path="/createNewJob" component={CreateWork} />
        <Route path="/myWorks" component={Works} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
        <Route path="/selectedWorkers" component={SelectedWorkWorkers} />
        <Route path="/selectedTasks" component={SelectedTasks} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/about" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <SocketProvider id={props.userId}>
      <Layout>{routes}</Layout>
    </SocketProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignUp: (userId, token) =>
      dispatch(actions.autoSignUp(userId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
