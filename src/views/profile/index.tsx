import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProfileRouter from "./ProfileRouter";

export const Profile = ({}) => {
  return (
    <>
      <BrowserRouter>
        <ProfileRouter />
      </BrowserRouter>
    </>
  );
};
