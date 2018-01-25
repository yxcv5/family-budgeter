import React from "react";

export const Input = props =>
  <div className="form-group">
    <input className="form-control" {...props} />
    {props.error && <span className="help-block">{props.error}</span>}
  </div>;
