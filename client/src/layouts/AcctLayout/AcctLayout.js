import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import AcctNav from '../../components/AcctNav';
import AcctHome from '../../pages/AcctHome';
import Report from '../../pages/Report';
import EditIn from '../../pages/EditIn';
import EditOut from '../../pages/EditOut';
import EditBudgt from '../../pages/EditBudgt';

const AcctLayout = ({ match }) => (
  <div>
    <AcctNav>
      <NavLink to={`${match.path}`} exact activeClassName="active">Account Home</NavLink>
      <NavLink to={`${match.path}/budget`} activeClassName="active">Budget</NavLink>
      <NavLink to={`${match.path}/income`} activeClassName="active">Income</NavLink>
      <NavLink to={`${match.path}/spending`} activeClassName="active">Spending</NavLink>
      <NavLink to={`${match.path}/report`} activeClassName="active">Report</NavLink>
    </AcctNav>
    <main style={{ marginTop: 20 }}>
      <Switch>
        <Route path={match.path} exact component={AcctHome} />
        <Route path={`${match.path}/budget`} component={EditBudgt}/>
        <Route path={`${match.path}/income`} component={EditIn}/>
        <Route path={`${match.path}/spending`} component={EditOut}/>
        <Route path={`${match.path}/report`} component={Report}/>       
      </Switch>
    </main>
  </div>
)

export default AcctLayout;