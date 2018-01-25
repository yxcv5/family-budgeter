import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/FormGroup";
import API from "../../utils/API";

class AddMember extends Component {

  state = {
    fullName: "",
    role: "",
    imgUrl: "",
    shoppingBehavior: "",
    loading: false,
    errors: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault(); 
    const errors = this.validateInput(this.state);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      API.saveMember({
        fullName: this.state.fullName,
        role: this.state.role,
        imgUrl: this.state.imgUrl,
        shoppingBehavior: this.state.shoppingBehavior
      })
      .then(res => {
        console.log("Member added to the user account:  " + res.data);
        this.props.history.push("/app/member");
      }) 
      .catch(err =>
         this.setState({ errors: err.response.data.errors, loading: false })
      );
    }
  };

  validateInput = input => {
    const errors = {};
    if(!input.fullName) 
      errors.fullName ="Name is required";
    if(!input.role)
      errors.role ="Role is required"; 
    return errors;
  };

  render() {
    const { fullName, role, imgUrl, shoppingBehavior, loading, errors } = this.state;
    return (
      <Container>
        <Row>
          <Col size='md-6 md-offset-3'>
            <form>
              <Input
                value={fullName}
                onChange={this.handleInputChange}
                name="fullName"
                placeholder="Nickname (required)"
                error={errors.fullName}
              />
              <Input
                value={role}
                onChange={this.handleInputChange}
                name="role"
                placeholder="Role (required)"
                error={errors.role}
              />
              <Input
                value={imgUrl}
                onChange={this.handleInputChange}
                name="imgUrl"
                placeholder="Image URL"
              />
              <TextArea
                value={shoppingBehavior}
                onChange={this.handleInputChange}
                name="shoppingBehavior"
                placeholder="Describe shopping behavior"
              />
              <FormBtn disabled={ loading } onClick={this.handleFormSubmit}>
                Add Member
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddMember;