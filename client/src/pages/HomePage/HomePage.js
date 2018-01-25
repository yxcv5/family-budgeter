import React from "react";
import Hero from "../../components/Hero";
import { Container, Row, Col } from "../../components/Grid";

const HomePage = () =>
  <div>
    <Hero backgroundImage="https://hsl-downloadable-files.s3.amazonaws.com/273/7810eb527f204683b858bf3b4c25e0ee.jpg">
      <h1>Mapping Your Future</h1>
      <h2>Start budgeting today by following these simple steps: </h2>
    </Hero>
    <Container style={{ marginTop: 10 }}>
      <Row>
        <Col size="md-12">
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#step1">Step #1</a></li>
            <li><a data-toggle="tab" href="#step2">Step #2</a></li>
            <li><a data-toggle="tab" href="#step3">Step #3</a></li>
            <li><a data-toggle="tab" href="#step4">Step #4</a></li>
          </ul>

          <div className="tab-content">
            <div id="step1" className="tab-pane fade in active">
              <h3><a href="/signup">Sign up</a> for an account</h3>
              <p>Already have an acount? <a href="/login">Log in here</a></p>
            </div>
            <div id="step2" className="tab-pane fade in">
              <h3>Build a budget</h3>
              <p>Categorize your income/spendings</p>
            </div>
            <div id="step3" className="tab-pane fade">
              <h3>Track your spendings</h3>
              <p>Record your income/spendings as they occur</p>
            </div>
            <div id="step4" className="tab-pane fade">
              <h3>View your monthly report</h3>
              <p>Compare your actual spendings with your budget</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>;

export default HomePage;