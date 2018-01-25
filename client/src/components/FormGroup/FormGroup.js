import React from "react";

export const FormGroup = ({ label, type, id, name, value, placeholder, onChange, error }) => (
  <div className={`form-group ${error ? "has-error" : ""}`}>
    <label htmlFor={id} className="control-label">{label}</label>
    <input className="form-control"
           placeholder={placeholder}
           onChange={onChange}
	       value={value}
	       type={type}
	       name={name}
	       id={id}  />
	  {error && <span className="help-block">{error}</span>}
  </div>
);

