import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import {FormGroup} from '../../components/FormGroup';
import Alert from '../../components/Alert';

class LoginPage extends Component {

  state = {
    data: {
      username: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault(); 
    const errors = this.validateInput(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.onFormSubmit(this.state.data)
        .then(() => console.log("success"))
        .catch(err => {
          console.log("Login server-side errors: " + err.response.data.errors);
          this.setState({ errors: err.response.data.errors, loading: false });
        });
    }
  };

  validateInput = input => {
    const errors = {};
    if(!input.username) 
      errors.username ="Please enter your username";
    if(!input.password) 
      errors.password ="Please enter your password";  
    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <Container>
        <Row>
          <Col size='md-6 md-offset-3'>
            <h2>Welcome Back!</h2>
              <form className='login'>
                {errors.login && (
                  <Alert type="danger">
                  Register errors: { errors.login }         
                  </Alert>
                )}             
                <FormGroup
                  label="Your Username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={this.handleInputChange}
                  error={errors.username}
                />
                <FormGroup
                  label="Your Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                />
                <button disabled={ loading } type="submit"
                        onClick={this.handleFormSubmit}>Sign In</button>
              </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;