import React from "react";

export const Panelbody = props =>
  <div className="panel-body" {...props}>
    {props.children}
  </div>;