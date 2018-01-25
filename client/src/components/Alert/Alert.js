import React from "react";

const Alert = props =>
  <div
    className={`alert alert-${props.type} fade in text-center`}
    style={{ width: "85%", margin: "0 auto", marginTop: "6%", marginBottom: "4%", ...props.style }}
  >
    {props.children}
  </div>;

export default Alert;
