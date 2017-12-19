import React from "react";

export const Deletebtn = props =>
  <button {...props} className="btn btn-danger float-right">
    {props.children}
  </button>;