import React from "react";
import classes from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={classes.loading_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
};

export default Loading;
