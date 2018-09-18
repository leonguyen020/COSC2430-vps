import React from "react";
import UserLayout from "./../../hoc/user";
import AdvertisementManagement from "./AdvertisementManagement";

const AdvertisementProfile = () => {
  return (
    <UserLayout>
      <h1>Advert Profile</h1>
      <AdvertisementManagement />
    </UserLayout>
  );
};

export default AdvertisementProfile;
