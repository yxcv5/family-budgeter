import React from "react";
import { NavLink } from "react-router-dom";
import Footer from '../Footer';
import "./SideBar.css";
    
const SideNav = ({ authed, onLogout }) => {
  if(!authed) {
    return (
      <nav>
        <NavLink to="/signup" activeClassName="active" >Sign Up</NavLink>
        <NavLink to="/login" activeClassName="active" >Login</NavLink>
      </nav>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h3>Welcome!</h3>
      </div>
      <nav>
        <NavLink to="/app/acct" activeClassName="active" >Account</NavLink>
        <NavLink to="/app/member" activeClassName="active" >Members</NavLink>
      </nav>
      <button className="btn btn-info btn-lg" onClick={onLogout}>Logout</button>
    </div>
  );
};

const SideBar = props => (
  <div id="sidebar" className="sidebar-offcanvas">
    <div className="col-md-12 side-nav text-center">
      <SideNav {...props} />
    </div>
    <Footer />
  </div>
);

export default SideBar;