import React, { useState } from "react";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import classes from "./User.module.css";
import femaleUser from "./pngguru.com.png";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import InputElement from "../../components/UI/Input/Input";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useSocket } from "../../contexts/SocketProvider";
//lol
const User = (props) => {
  const [deleteEl, setDelete] = useState(false);
  const [addTask, setTask] = useState(false);
  const socket = useSocket();
  const [userForm, setForm] = useState({
    controls: {
      TaskName: {
        elementType: "input",
        elementConfig: {
          type: "",
          placeholder: "make coffe",
        },
        label: "Task name",
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
      TaskDescription: {
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
  });
  const checkValidity = (value, rules) => {
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
  };
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...userForm.controls,
      [controlName]: {
        ...userForm.controls[controlName],
        value: event.target.value,
        validation: {
          ...userForm.controls[controlName].validation,
          valid: checkValidity(
            event.target.value,
            userForm.controls[controlName].validation
          ),
        },
        touched: true,
      },
    };
    setForm({ controls: updatedControls });
  };

  const cancelDelete = () => {
    if (addTask) {
      setTask(!addTask);
    }
    setDelete(!deleteEl);
  };

  const addTaskFunc = () => {
    if (deleteEl) {
      setDelete(!deleteEl);
    }
    setTask(!addTask);
  };
  const startCreatingTask = () => {
    addTaskFunc();
    props.onAddTask(
      props.userId,
      props.workId,
      props.selectedUserId,
      props.token,
      userForm.controls.TaskName.value,
      userForm.controls.TaskDescription.value
    );
    console.log(`send Task recipientId= ${props.selectedUserId}`);
    socket.emit("boss-add-task", { recipientId: props.selectedUserId });
  };

  const formElementsArray = [];
  for (let key in userForm.controls) {
    formElementsArray.push({
      id: key,
      config: userForm.controls[key],
    });
  }
  let form = formElementsArray.map((element) => {
    return (
      <InputElement
        key={element.id}
        changed={(event) => inputChangedHandler(event, element.id)}
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
  if (props.error) {
    error = (
      <React.Fragment>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
        </style>
        <div className={classes.errorMessage}>{props.error}</div>
      </React.Fragment>
    );
    console.log("fefef");
  }
  let spinner = null;
  if (props.loading) {
    spinner = <Spinner />;
  }
  let redirect = null;
  if (props.redirect) {
    redirect = <Redirect to={props.redirect} />;
  }
  if (props.redirect == null || props.redirect == "null") {
    redirect = null;
  }
  let src = null;
  if (props.avatar == null) {
    src = femaleUser;
  } else {
    src = props.avatar;
  }
  return (
    <li className={classes.User}>
      <div className={classes.UserMainPart}>
        <div className={classes.LeftPart}>
          <div className={classes.DeleteUser} onClick={cancelDelete}>
            <i class="fas fa-user-minus"></i>
          </div>
          <img className={classes.Avatar} src={src} />
        </div>
        <div className={classes.RightPart}>
          <div className={classes.TopUserHeader}>
            <div className={classes.Label}>{props.userName}</div>
          </div>
          <div className={classes.TaskGroup}>
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
            </style>
            <div>Tasks:</div>
            <div className={classes.TaskGroupValue}>
              <i class="fas fa-tasks"></i>
            </div>
            <div className={classes.TaskGroupValue}>{props.userTasks}</div>
          </div>
          <div className={classes.RatingGroup}>
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
            </style>
            <div>Rating:</div>
            <div className={classes.RatingGroupValue}>
              <i class="far fa-smile"></i>
            </div>
            <div className={classes.TaskGroupValue}>{"88/100"}</div>
          </div>
          <button className={classes.ButtonAddTask} onClick={addTaskFunc}>
            Add task
          </button>
        </div>
      </div>
      <div
        className={
          deleteEl
            ? [classes.active, classes.DeleteContainer].join(" ")
            : classes.DeleteContainer
        }
      >
        <div className={classes.container}>
          <h1>Delete User</h1>
          <p>Are you sure you want to delete your user?</p>

          <div className={classes.clearfix}>
            <button
              type="button"
              onClick={cancelDelete}
              className={classes.cancelbtn}
            >
              Cancel
            </button>
            <button
              type="button"
              className={classes.deletebtn}
              onClick={() =>
                props.deleteWorker(
                  props.token,
                  props.workId,
                  props.selectedUserId
                )
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          addTask
            ? [classes.active, classes.addTaskContainer].join(" ")
            : classes.addTaskContainer
        }
      >
        <div className={classes.addTask}>
          <h1>Add task</h1>
          <form className={classes.form}>
            {form}
            {error}
            <div className={classes.clearfix}>
              <button
                type="button"
                onClick={addTaskFunc}
                className={classes.cancelbtn}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startCreatingTask}
                className={classes.deletebtn}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </li>
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
    deleteWorker: (token, workId, userId) =>
      dispatch(actions.deleteWorker(token, workId, userId)),
    onAddTask: (
      ownerId,
      workId,
      recipientId,
      token,
      taskLabel,
      taskDescription
    ) =>
      dispatch(
        actions.addTask(
          ownerId,
          workId,
          recipientId,
          token,
          taskLabel,
          taskDescription
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
