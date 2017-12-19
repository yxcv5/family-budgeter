import React, { Component } from "react";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Panelheading, Panelbody } from "../../components/Panel";
import { Srchedwell, Savebtn } from "../../components/Resultwell";
import { Formgroup, Input, Searchbtn } from "../../components/Searchform";

class Home extends Component {
  state = {
    articles: [],
    topic: "",
    start: "",
    end: ""
  };

  searchNYTArticles = (term, start, end) => {
    const artArr = [];
    API.queryNYT(term, start, end)
      .then(res => {
        let len = res.data.response.docs.length;
        if(len > 5)
          len = 5;
        if(len) {
          for(let i=0; i<len; i++) {
            let artObj = {};
            artObj["id"] = i+1;
            artObj["headline"] = res.data.response.docs[i].headline.main;
            artObj["author"] = res.data.response.docs[i].byline.original ?
              res.data.response.docs[i].byline.original.substring(3) : "";
            artObj["pubdate"] = res.data.response.docs[i].pub_date.substring(0,10);
            artObj["url"] = res.data.response.docs[i].web_url;
            artArr.push(artObj);
          }   
          this.setState({ articles: artArr});     
        }
        else {
          this.setState({ articles: [] });
        }       
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      this.searchNYTArticles(this.state.topic, this.state.start, this.state.end);
      this.setState({ 
        topic: "", 
        start: "",
        end: "" 
      });
    }
  };

  handleSaveArticle = idx => {
    const art = this.state.articles[idx-1];
    delete art.id;
    console.log(art);
    API.saveArticle(art)
    .then(res => console.log("Article saved"))
      .catch(err => console.log(err));
  };

  render() {
    return (
    <Container>
      <Header subtitle="Search for and annotate articles of interest!" />
      <Row>
        <Col size="sm-12">
          <br />
          <Panelheading faclasses="fa fa-list-alt" paneltitle="Search" >
            <Panelbody>
              <form>
                <Formgroup labelfor="search" labeltext="Topic (Required)">
                  <Input value={this.state.topic}
                     onChange={this.handleInputChange}
                     name="topic"
                     id="search"
                  />
                </Formgroup>
                <Formgroup labelfor="start-year" labeltext="Start Year">
                  <Input value={this.state.start}
                     onChange={this.handleInputChange}
                     name="start"
                     id="start-year"
                  />
                </Formgroup>
                <Formgroup labelfor="end-year" labeltext="End Year">
                  <Input value={this.state.end}
                     onChange={this.handleInputChange}
                     name="end"
                     id="end-year"
                  />
                </Formgroup>
                <Searchbtn
                  disabled={!this.state.topic}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </Searchbtn>
              </form>
            </Panelbody>
          </Panelheading>
        </Col>
      </Row>
      <Row>
        <Col size="sm-12">
          <br />
          <Panelheading faclasses="fa fa-table" paneltitle="Top Articles" >
            <Panelbody>
              {this.state.articles.length ? (
                <div>
                  {this.state.articles.map(article => (
                    <Srchedwell key={article.id} art={article}>
                      <Savebtn onClick={() => this.handleSaveArticle(article.id)}> Save </Savebtn>
                    </Srchedwell>
                  ))}
                </div>
                ) : (
                <div className="well">
                  <h3>No Results to Display</h3>
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

export default Home;
