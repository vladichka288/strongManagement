import React, { Component } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
const NavigationItems = (props) => {
  let links = [];
  if (props.token) {
    links = [
      { link: "/profile", label: "My Profile" },
      { link: "/workersReports", label: "Workers reports" },
      { link: "/myTasks", label: "My tasks" },
      { link: "/getJob", label: "Get job" },
      { link: "/myWorks", label: "My works" },
      { link: "/createNewJob", label: "Create work" },
      { link: "/about", label: "About" },
      { link: "/logout", label: "Log out" },
   
    ];
  } else {
    links = [
      { link: "/login", label: "Log in" },
      { link: "/auth", label: "Registration" },
      { link: "/about", label: "About" },
    ];
  }
  let linksElements = links.map((element, id) => {
    return (
      <NavigationItem {...props} link={element.link} key={id}>
        {element.label}
      </NavigationItem>
    );
  });
  return (
    <nav
      className={
        props.clicked
          ? [classes.active, classes.headerMenu].join(" ")
          : classes.headerMenu
      }
    >
      <ul className={classes.NavigationItems}>{linksElements}</ul>
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(NavigationItems);
