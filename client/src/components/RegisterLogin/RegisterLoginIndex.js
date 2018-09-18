import React from "react";
import MyButton from "../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>NEW USERS</h1>
            <p>Create An Account to Manage Your Advertisements And Projects.</p>
            <MyButton
              type="default"
              title="Register"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="right">
            <h2>Registered Users</h2>
            <p>Please Log In</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
