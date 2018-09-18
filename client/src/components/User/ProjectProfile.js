import React from "react";
import UserLayout from "./../../hoc/user";
import ProjectManagement from "./ProjectManagement";

const ProjectProfile = () => {
  return (
    <UserLayout>
      <h1>Project Profile</h1>
      <ProjectManagement />
    </UserLayout>
  );
};

export default ProjectProfile;
