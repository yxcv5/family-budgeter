import React from "react";

const DeleteBtn = props => (
  <button style={{ float: "right", marginBottom: 10 }} className="btn btn-danger" {...props}>
    Remove
  </button>
);

export default DeleteBtn;