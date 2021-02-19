import React, { Component } from "react";
import classes from "../../Login/Login.module.css";
import classesTwo from "./CreateWork.module.css";
import Card from "../../../components/UI/Card/Card";
import InputElement from "../../../components/UI/Input/Input";
import ButtonElement from "../../../components/UI/Button/Button";
import * as actionTypes from "../../../store/actions/actionTypes";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
class CreateWork extends Component {
  state = {
    controls: {
      WorkName: {
        elementType: "input",
        elementConfig: {
          type: "",
          placeholder: "Dota 2",
        },
        label: "Work name",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 1,
          maxLength: 20,
          isEmail: false,
        },
      },
      WorkDescription: {
        elementType: "textarea",
        elementConfig: {
          type: "",
          placeholder:
            "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
        },
        label: "Description",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 3,
          maxLength: 500,
        },
      },
    },
    signUp: true,
  };
  componentDidMount() {
    this.props.setRedirectPath("null");
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log(value);
      isValid = pattern.test(value) && isValid;
      console.log(isValid);
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: {
          ...this.state.controls[controlName].validation,
          valid: this.checkValidity(
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
    this.props.onCreateWork(
      this.state.controls.WorkName.value,
      this.state.controls.WorkDescription.value,
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
    if (this.props.redirect) {
      redirect = <Redirect to={this.props.redirect} />;
    }
    if (this.props.redirect == null || this.props.redirect == "null") {
      redirect = null;
    }

    return (
      <React.Fragment>
        {spinner}
        <Card titleName="Create new work" width="500px">
          {redirect}
          <form className={classes.form} onSubmit={this.submitHandler}>
            {form}
            {error}
            <ButtonElement btnType="Success">CREATE</ButtonElement>
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
        error: state.auth.error,
        redirect: state.auth.redirect,
        loading: state.auth.loading,
      };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCreateWork: (name, description, userId, token) =>
      dispatch(actions.createWork(name, description, userId, token)),
    setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateWork);
