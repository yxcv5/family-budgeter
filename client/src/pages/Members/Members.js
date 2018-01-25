import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../../components/Thumbnail';
import { List, ListItem } from "../../components/List";
import { Row, Col, Container } from "../../components/Grid";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

class Members extends React.Component {
  state = {
    members: [],
    loading: true
  };

  componentDidMount() {
    this.loadMembers();
  }

  removeMember = id => {
    API.deleteMember(id)
      .then(res => this.loadMembers())
      .catch(err => console.log(err));
  };

  loadMembers = () => {
    API.getMembers()
    .then(res => {
      this.setState({ 
        members: res.data.members,
        loading: false
      });
    })
    .catch(err => console.log(err));
  };

  render() {
    const { members, loading } = this.state;

    if(loading)
      return <div>Loading...</div>;

    return (
      <Container>
        <Row>
          <Col size="md-11">
          {members.length ? (
            <List>
              {members.map( member => (
                <ListItem key={member._id}>
                  <Link
                    to={{
                      pathname: `/app/member/${member._id}`,
                      state: { modal: true }
                    }}
                  >
                    <Thumbnail src={member.imgUrl} />
                    <h4>{member.fullName.toUpperCase()}</h4>
                  </Link>
                  <DeleteBtn onClick={() => this.removeMember(member._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Members on This Account</h3>
          )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Members;