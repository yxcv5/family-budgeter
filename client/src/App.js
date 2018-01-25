import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import PrimaryLayout from "./layouts/PrimaryLayout";

const App = () =>
  <Router>
    <div>
      <Nav />
      <PrimaryLayout />
    </div>
  </Router>;

export default App;