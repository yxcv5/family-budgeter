import React from "react";

const ToggleBtn = props =>
  <p className="visible-xs">
    <button type="button" className="btn btn-info btn-xs" data-toggle="offcanvas" onClick={props.onToggle}>
        <i className="glyphicon glyphicon-chevron-left"></i>
    </button>
  </p>;

export default ToggleBtn;
