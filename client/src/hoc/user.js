import React from "react";
import { Link } from "react-router-dom";

const links = [
  // {
  //   name: "My Account",
  //   linkTo: "/user/dashboard",
  // },
  {
    name: "Home",
    linkTo: "/user/dashboard",
  },
  {
    name: "User Information",
    linkTo: "/user/user-profile",
  },
  // {
  //   name: 'My cart',
  //   linkTo: '/user/cart'
  // },
  {
    name: "My Advertisements",
    linkTo: "/user/advertisements",
  },
  {
    name: "My Projects",
    linkTo: "/user/projects",
  },
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
