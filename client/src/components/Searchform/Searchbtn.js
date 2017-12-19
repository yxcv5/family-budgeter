import React from "react";

export const Searchbtn = props =>
  <button {...props} type="submit" className="btn btn-primary">
    <i className="fa fa-search"></i>
    {props.children}
  </button>;