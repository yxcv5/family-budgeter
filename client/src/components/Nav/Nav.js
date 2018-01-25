import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () =>
  <div className="navbar navbar-inverse navbar-fixed-top">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link className="navbar-brand" to="/" >
        Family Budget Manager
      </Link>
    </div>
    <div className="main-nav collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/home"
              ? "active"
              : ""
          }
        >
          <Link to="/home">Home</Link>
        </li>
        <li
          className={window.location.pathname === "/app/member" ? "active" : ""}
        >
          <Link to="/app/member">About</Link>
        </li>
      </ul>
    </div>
  </div>;

export default Nav;

