import React from "react";

export const Deletebtn = props =>
  <button {...props} className="btn btn-danger" style={{ float: "right" }}>
    {props.children}
  </button>;