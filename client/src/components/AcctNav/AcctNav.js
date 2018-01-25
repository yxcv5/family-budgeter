import React from "react";
import "./AcctNav.css";

const AcctNav = props =>
  <header className="acct-nav">
    <h3>{props.subtitle}</h3>
    <nav>
       {props.children}
    </nav>
  </header>;

export default AcctNav;