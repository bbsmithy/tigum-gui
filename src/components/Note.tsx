import React, { useState } from "react";
import logo from "../logo.png";

export const Note = (props: any) => {
  return (
    <div className="card">
      <img src={logo} alt="Avatar" />
      <div className="container">
        <h4>
          <b>John Doe</b>
        </h4>
        <p>Architect & Engineer</p>
      </div>
    </div>
  );
};
