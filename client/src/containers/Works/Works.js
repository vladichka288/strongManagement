import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import WorkComponent from "../../components/Works/WorkComponent/WorkComponent";
import classes from "./Works.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
class MyWorks extends Component {
  state = {
    works: [],
    didComponentsLoad: false,

  };

  componentDidMount() {
    this.props.onUploadWorks(this.props.userId, this.props.token);
    console.log(this.props.works);
    this.props.setRedirectPath("null");
  }
  componentDidUpdate(prevProps) {
    if (prevProps.works != this.props.works) {
      this.setState({ didComponentsLoad: true });
      this.state.works = this.props.works;
    }
  }
  setCopiedText = (text) => {
    this.setState({ copiedText: text });
  };

  render() {
    let spinner = null;
    if (this.props.loadingWork) {
      spinner = <Spinner />;
    }
    let worksRender;
    if (this.state.didComponentsLoad == false) {
      worksRender = this.props.works.map((work, id) => {
        return (
          <WorkComponent
            key={id}
            description={work.description}
            name={work.name}
            password={work.password}
            workId={work.id}
            workers={work.workers ? work.workers : null}
            index={id}
          />
        );
      });
    } else {
      worksRender = this.state.works.map((work, id) => {
        return (
          <WorkComponent
            key={id}
            description={work.description}
            name={work.name}
            password={work.password}
            workId={work.id}
            workers={work.workers ? work.workers : null}
            index={id}
           
          />
        );
      });
    }

    return (
      <React.Fragment>
        {spinner}
        <ul className={classes.WorkList}>{worksRender}</ul>
      </React.Fragment>
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
    loadingWork: state.works.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUploadWorks: (userId, token) =>
      dispatch(actions.uploadWorks(userId, token)),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyWorks);
