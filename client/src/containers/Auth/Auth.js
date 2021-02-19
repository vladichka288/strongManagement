import React, { Component } from "react";
import classes from "./Auth.module.css";
import Card from "../../components/UI/Card/Card";
import InputElement from "../../components/UI/Input/Input";
import ButtonElement from "../../components/UI/Button/Button";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Auth extends Component {
  state = {
    controls: {
      nickname: {
        elementType: "input",
        elementConfig: {
          type: "",
          placeholder: "VladichBub",
        },
        label: "Nickname",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 4,
          isEmail: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        label: "Email",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          isEmail: true,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        label: "Password",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          maxLength: 25,
        },
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm password",
        },
        label: "Confirm password",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          maxLength: 25,
        },
      },
    },
    signUp: true,
  };
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
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.confirmPassword.value,
      this.state.controls.nickname.value
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
    let redirect = null;
    if (this.props.redirect) {
      redirect = <Redirect to={this.props.redirect} />;
    }
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    return (
      <React.Fragment>
        {spinner}
        <Card titleName="Authentification" width="500px">
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
    error: state.auth.error,
    redirect: state.auth.redirect,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login, password, repeatPassword, nickname) =>
      dispatch(actions.auth(login, password, repeatPassword, nickname)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
