import React from "react";
import { Switch, Route } from "react-router-dom";

import Auth from "./hoc/auth";
import Layout from "./hoc/layout";

import Home from "./components/Home/HomeIndex";

import RegisterLogin from "./components/RegisterLogin/RegisterLoginIndex";
import Register from "./components/RegisterLogin/register";

import PropertiesIndex from "./components/Properties/PropertiesIndex";

import AdvertisementDetail from "./components/Advertisement/AdvertisementIndex";

import UserDashboard from "./components/User/UserIndex";
import UserProfile from "./components/User/UserProfile";
import AdvertisementProfile from "./components/User/AdvertisementProfile";
import ProjectProfile from "./components/User/ProjectProfile";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route
          path="/user/user-profile"
          exact
          component={Auth(UserProfile, true)}
        />
        <Route
          path="/user/advertisements"
          exact
          component={Auth(AdvertisementProfile, true)}
        />
        <Route
          path="/user/projects"
          exact
          component={Auth(ProjectProfile, true)}
        />

        <Route
          path="/advertisement-detail/:id"
          exact
          component={Auth(AdvertisementDetail, null)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/register-login"
          exact
          component={Auth(RegisterLogin, false)}
        />

        <Route
          path="/properties"
          exact
          component={Auth(PropertiesIndex, null)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
