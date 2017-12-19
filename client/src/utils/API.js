import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

export default {
  // Query NYT articles
  queryNYT: function(term, start, end) {
    let queryURL = BASEURL + term + APIKEY;
    if(start) {
      let queryURl = queryURl + "&begin_date=" + start + "0101";
    }
    if(end) {
      let queryURl = queryURl + "&end_date=" + end + "0101";
    }
    return axios.get(queryURL);
  },
  // Saves an article to the database
  saveArticle: function(data) {
    return axios.post("/api/articles", data);
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  }
};