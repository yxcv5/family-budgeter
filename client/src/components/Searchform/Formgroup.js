import React from "react";

export const Formgroup = props =>
    <div className="form-group">
        <label htmlFor={props.labelfor}> {props.labeltext} </label>
        {props.children}
    </div>;