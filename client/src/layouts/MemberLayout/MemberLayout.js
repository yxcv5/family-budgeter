import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Members from "../../pages/Members";
import AddMember from "../../pages/AddMember";
import MemberModal from "../../pages/MemberModal";
import AcctNav from '../../components/AcctNav';

class MemberLayout extends React.Component {

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location, match } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );
    
    return (
      <div>
        <AcctNav subtitle="The Family">
          <NavLink to={`${match.path}`} exact activeClassName="active">Browse</NavLink>
          <NavLink to={`${match.path}/add`} activeClassName="active">Add</NavLink>
        </AcctNav>
        <main style={{ marginTop: 20 }}>
          <Switch location={isModal ? this.previousLocation : location}>
            <Route path={`${match.path}`} exact component={Members} />
            <Route path={`${match.path}/add`} component={AddMember}/>
          </Switch>
          { isModal ? <Route path={`${match.path}/:id`} component={MemberModal} /> : null }
        </main>
      </div>
    );
  }
}

export default MemberLayout;