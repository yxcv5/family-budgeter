import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../Grid";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <Container fluid>
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/">
          NYT Article Scrubber
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/search"
              ? "active"
              : ""
          }
        >
          <Link to="/search">Search</Link>
        </li>
        <li
          className={window.location.pathname === "/saved" ? "active" : ""}
        >
          <Link to="/saved">Saved</Link>
        </li>
      </ul>
    </Container>
  </nav>;

export default Nav;
