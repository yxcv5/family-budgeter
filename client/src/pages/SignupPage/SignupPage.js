import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import {FormGroup} from '../../components/FormGroup';
import Alert from '../../components/Alert';

class SignupPage extends Component {

  state = {
    data: {
      username: "",
      email: "",
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
      console.log(this.props);
      console.log(typeof this.props.onFormSubmit);
      this.props.onFormSubmit(this.state.data)
        .then(() => console.log("success"))
        // .then(() => this.props.history.push("/app/acct")) if the parent rerender because of setState, need no redirect?
        .catch(err =>{
          console.log("Register server-side errors: " + err.response.data.errors);
          this.setState({ errors: err.response.data.errors, loading: false });
        });
    }
  };

  validateInput = input => {
    const errors = {};
    if(!input.username) 
      errors.username ="Username is required";

    if(!input.password)
      errors.username ="Password is required";
    else if(input.password.length < 6) 
      errors.password ="Password must be at least 6 characters long";  

    if(!input.email) 
      errors.email ="Email is required";
    else if(!(/.+\@.+\..+/.test(input.email))) 
      errors.email ="Invalid email";

    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <Container>
        <Row>
          <Col size='md-6 md-offset-3'>
            <h2>Join Today!</h2>
              <form className='signup'>  
              {errors.signup && (
                <Alert type="danger">
                Register errors: { errors.signup }         
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
                  label="Your Email Address"
                  type="email"
                  placeholder="someone@somewhere.com"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
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
                        onClick={this.handleFormSubmit}>Sign Up</button>
              </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignupPage;