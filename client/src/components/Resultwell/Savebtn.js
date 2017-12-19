import React from "react";

export const Savebtn = props =>
  <button {...props} className="btn btn-success float-right">
    {props.children}
  </button>;