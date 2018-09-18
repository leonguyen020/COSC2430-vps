import React from "react";
import UserLayout from "../../hoc/user";

const UserDashboard = ({ user }) => {
  // console.log({user})
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>Welcome {user.userData.firstName}</h1>
          <div>
            <p>
              You Can Edit Your Account Information, Manage Your Advertisements
              And Projects
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
