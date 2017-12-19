import React from "react";

export const Savebtn = props =>
  <button {...props} className="btn btn-success" style={{ float: "right" }}>
    {props.children}
  </button>;