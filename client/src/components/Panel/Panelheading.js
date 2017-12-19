import React from "react";

export const Panelheading = ({ faclasses, paneltitle, children }) =>
  <div className="panel panel-primary">
	  <div className="panel-heading">
	    <h3 className="panel-title">
	        <strong><i className={faclasses}></i>
	           {paneltitle}
	        </strong>
	    </h3>
	  </div>
	  {children}
  </div>;