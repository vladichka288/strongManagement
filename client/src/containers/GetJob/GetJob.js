import React, { Component } from "react";
import classes from "../Login/Login.module.css";
import Card from "../../components/UI/Card/Card";
import InputElement from "../../components/UI/Input/Input";
import ButtonElement from "../../components/UI/Button/Button";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import checkValidity from "../../functions/validity";
class GetJob extends Component {
  state = {
    controls: {
      jobPassCode: {
        elementType: "input",
        elementConfig: {
          type: "",
          placeholder: "2bod7f22-453a-11eb-b378-0242ac130002",
        },
        label: "Pass code",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 36,
          maxLength: 36,
          isEmail: false,
        },
      },
    },
    signUp: true,
  };
  componentDidMount() {
    console.log(this.props);
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: {
          ...this.state.controls[controlName].validation,
          valid: checkValidity(
            event.target.value,
            this.state.controls[controlName].validation
          ),
        },
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onGetJob(
      this.state.controls.jobPassCode.value,
      this.props.userId,
      this.props.token
    );
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((element) => {
      return (
        <InputElement
          key={element.id}
          changed={(event) => this.inputChangedHandler(event, element.id)}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          invalid={!element.config.validation.valid}
          value={element.config.value}
          shouldValidate={element.config.validation.required}
          touched={element.config.touched}
          label={element.config.label}
        />
      );
    });
    let error = null;
    if (this.props.error) {
      error = (
        <React.Fragment>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
          </style>
          <div className={classes.errorMessage}>{this.props.error}</div>
        </React.Fragment>
      );
      console.log("fefef");
    }
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    let redirect = null;
    if (this.props.redirectWork) {
      redirect = <Redirect to={this.props.redirectWork} />;
    }
    return (
      <React.Fragment>
        {spinner}
        <Card titleName="Get a job" width="500px">
          {redirect}
          <form className={classes.form} onSubmit={this.submitHandler}>
            {form}
            {error}
            <ButtonElement btnType="Success">OK</ButtonElement>
          </form>
        </Card>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    redirect: state.auth.redirect,
    error: state.works.error,
    loading: state.works.loading,
    redirectWork: state.works.redirectWork,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetJob: (password, userId, jobId) =>
      dispatch(actions.getJob(password, userId, jobId)),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetJob);
