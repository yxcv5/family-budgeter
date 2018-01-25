import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideBar from "../../components/SideBar";
import ToggleBtn from "../../components/ToggleBtn";
import MainPane from "../MainPane";
import UnauthedRoute from "../../routes/UnauthedRoute";
import AuthedRoute from "../../routes/AuthedRoute";
import HomePage from "../../pages/HomePage";
import SignupPage from "../../pages/SignupPage";
import LoginPage from "../../pages/LoginPage";
import './PrimaryLayout.css';
import decode from "jwt-decode";
import setReqAuthorization from "../../utils/setReqAuthorization";
import API from "../../utils/API";

class PrimaryLayout extends Component {
  state = {    
    user: {},
    isAuthenticated: false,
    openSideBar: false,
    loading: true
  };

  componentDidMount() {  //in case of refreshing page
    let user = {};
    const token = localStorage.getItem('budgtUsrToken'); 
    // console.log(token);
    if (token) {
      setReqAuthorization(token);
      user = decode(token);
      console.log("The current user is: " + user._id);
    }
    this.setState({
      isAuthenticated: Object.keys(user).length !== 0,
      user: user,
      loading: false
    });
  }

  toggleSideBar = () => {
  	this.setState(function(prevState) {
  		return { openSideBar: !prevState.openSideBar };
  	});
  };

  signupUser = (data) => {
    return API.signup(data)
      .then(token => {
        localStorage.setItem('budgtUsrToken', token);
        setReqAuthorization(token);
        const user = decode(token);        
        this.setState({
          isAuthenticated: true,
          user: user,
          loading: false
        });
      });
  };

  loginUser = (data) => {
    return API.login(data)
      .then(token => {
        localStorage.setItem('budgtUsrToken', token);
        setReqAuthorization(token);
        const user = decode(token);
        this.setState({
          isAuthenticated: true,
          user: user,
          loading: false
        });
      });
  }; 

  logoutUser = () => {    
    localStorage.removeItem('budgtUsrToken');
    setReqAuthorization(false);
    this.setState({
      isAuthenticated: false,
      user: {},
      loading: false
    });   
  };

  render() {
    if(this.state.loading)
      return (<div>Loading...</div>);

    return (
      <div className={`row-offcanvas row-offcanvas-left ${this.state.openSideBar ? "active" : ""}`}>
        <SideBar authed={this.state.isAuthenticated} onLogout={this.logoutUser} />
        <div id="mainpane">
  		    <div className="col-md-12">
            <ToggleBtn onToggle={this.toggleSideBar} />
    		    <Switch>
    		      <Route exact path="/" component={HomePage} />
    		      <Route path="/home" component={HomePage} />
    		      <UnauthedRoute path="/signup" authed={this.state.isAuthenticated} onFormSubmit={this.signupUser} component={SignupPage} />
    		      <UnauthedRoute path="/login" authed={this.state.isAuthenticated} onFormSubmit={this.loginUser} component={LoginPage} />
    		      <AuthedRoute path="/app" authed={this.state.isAuthenticated} component={MainPane} />
    		      <Route component={HomePage} />
    		    </Switch>     
  		    </div>
		    </div>
      </div>
    );
  }
}

export default PrimaryLayout;