import React from "react";

export const Searchbtn = props =>
  <button {...props} type="submit" className="btn btn-success">
    <i className="fa fa-search"></i>
    {props.children}
  </button>;