import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import avatar from "../../components/User/pngguru.com.png";

const Profile = (props) => {

  const [error, setError] = useState(null);
  const [pictures, setPictures] = useState([]);
  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
    console.log(pictures);
  };
  useEffect(() => {
    console.log("chpyk");
    props.onUploadProfile(props.userId, props.token);
  }, []);
  const uploadPhoto = () => {
    console.log(pictures);
    if (pictures.length == 0 || pictures.length > 1) {
      setError("Select only one image with a supported extension");
    } else {
      props.onUploadImage(props.userId, props.token, pictures[0]);
    }
    //lol
  };
  let avatarElement = null;
  if (props.loading) {
    avatarElement = <div className={classes.loader}>Loading...</div>;
  } else {
    let srcAvatar = props.avatar ? props.avatar : avatar;
    avatarElement = <img className={classes.Photo} src={srcAvatar}></img>;
  }

  return (
    <div className={classes.Card}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
      </style>
      <div className={classes.NickName}>{props.nickname}</div>
      {avatarElement}
      <ImageUploader
        withIcon={true}
        buttonText="Select image"
        onChange={onDrop}
        imgExtension={[".jpg", ".jpeg", ".png"]}
        maxFileSize={5242880}
      />
      <div className={classes.ErrorMessage}>{error}</div>
      <button className={classes.ConfirmButton} onClick={uploadPhoto}>
        Upload Photo
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    avatar: state.auth.avatar,
    nickname: state.auth.nickname,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadImage: (ownerId, token, photoFile) =>
      dispatch(actions.uploadImage(ownerId, token, photoFile)),
    onUploadProfile: (userId, token) =>
      dispatch(actions.uploadProfile(userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
