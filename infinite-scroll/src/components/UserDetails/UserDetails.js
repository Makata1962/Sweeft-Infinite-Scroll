import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useUserFetch from "../../hooks/useUserFetch";
import FriendList from "../FriendList/FriendList";
import Loading from "../Loading/Loading";
import classes from "./UserDetails.module.scss";

const UserDetails = () => {
  const { userId } = useParams();
  const { loading, error, user } = useUserFetch(userId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="user-details">
        <div className="error-message">Error loading user data</div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <img className={classes.avatar} src={user.imageUrl} alt={user.name} />
        <div className={classes.info}>
          <h2 className={classes.name}>
            {user.prefix}
            {user.name} {user.lastName}
          </h2>
          <p className={classes["job-details"]}>{user.title}</p>
          <p className={classes.email}>Email: {user.email}</p>
          <p className={classes["ip-address"]}>IP Address: {user.ip}</p>
          <p className={classes["job-area"]}>Job Area: {user.jobArea}</p>
          <p className={classes["job-type"]}>Job Type: {user.jobType}</p>
        </div>
        <div className={classes.address}>
          <h3 className={classes.title}>Address</h3>
          <p className={classes.company}>{user.company.name}</p>
          <p className={classes.city}>City: {user.address.city}</p>
          <p className={classes.country}>Country: {user.address.city}</p>
          <p className={classes.state}>State: {user.address.state}</p>
          <p className={classes.street}>
            Street Address: {user.address.streetAddress}
          </p>
          <p className={classes.zip}>ZIP: {user.address.zipCode}</p>
        </div>
      </div>
      <FriendList />
    </Fragment>
  );
};

export default UserDetails;
