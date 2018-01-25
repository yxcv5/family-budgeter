import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnauthedRoute = ({ component: Component, authed, onFormSubmit, ...rest }) => (
      <Route {...rest} render={props => (
        !authed
          ? <Component onFormSubmit={onFormSubmit}/>
          : <Redirect to="/app" />
      )} />
    );

export default UnauthedRoute;