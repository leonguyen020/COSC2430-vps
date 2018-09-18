import React from "react";
import UserLayout from "./../../hoc/user";
import UserInfoManagement from "./UserInfoManagement";

const UserProfile = () => {
  return (
    <UserLayout>
      <h1>User Profile</h1>
      <UserInfoManagement />
    </UserLayout>
  );
};

export default UserProfile;
