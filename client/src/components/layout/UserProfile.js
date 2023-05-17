import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage.js";

const UserProfile = ({ user }) => {

  return (
      <div className="grid-container profile-box">
        <div className="grid-x align-center">
            <div className="cell medium-8 large-6">
            <h2>Account Information:</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <div className="align-middle align-center"><ProfileImage /></div>
        </div>
        </div>
      </div>
  );
};

export default UserProfile;
