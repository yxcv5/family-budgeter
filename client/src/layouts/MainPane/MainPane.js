import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
// import Wrapper from '../../components/Wrapper';
import MemberLayout from '../MemberLayout';
import AcctLayout from '../AcctLayout';

const MainPane = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/acct`} component={AcctLayout} />
      <Route path={`${match.path}/member`} component={MemberLayout} />
      <Redirect to={`${match.path}/acct`} />
    </Switch>
  </div>
);

export default MainPane;