import React from "react";
import "./Header.css";

const Header = props =>
  <div className="jumbotron head">
    <h1 className="text-center">
       <strong>
	       <i className="fa fa-newspaper-o"></i>
	       New York Times Article Scrubber
       </strong>
    </h1>
    <h2 className="text-center">{props.subtitle}</h2>
  </div>;

export default Header;