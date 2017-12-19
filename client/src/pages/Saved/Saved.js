import React, { Component } from "react";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Panelheading, Panelbody } from "../../components/Panel";
import { Savedwell, Deletebtn } from "../../components/Resultwell";

class Saved extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    API.getArticles()
    .then(res =>
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  handleDeleteArticle = id => {
    API.deleteArticle(id)
    .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
    <Container>
      <Header subtitle="Save articles for later reference" />
      <Row>
        <Col size="sm-12">
          <br />
          <Panelheading faclasses="fa fa-table" paneltitle="Saved Articles" >
            <Panelbody>
              {this.state.articles.length ? (
                {this.state.articles.map(article => 
                    <Savedwell key={article._id} art={article}>
                      <Deletebtn onClick={() => this.handleDeleteArticle(article._id)}> Remove </Deletebtn>
                    </Savedwell>
                  )}
              ) : (
                <div className="well">
                  <h3>No Saved Articles</h3>
                </div>
              )}              
            </Panelbody>
          </Panelheading>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default Saved;
