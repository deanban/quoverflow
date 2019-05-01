import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import Landing from './components/landing/Landing';
import Landing from "./components/landing/LandingHook";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Feed from "./components/layouts/Feed";
import Article from "./components/layouts/Article";
import Sidenav from "./components/layouts/Sidenav";
import Ads from "./components/layouts/Ads";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            {/* <div className="wrapper">
            <Header />
            <Feed />
            <Article />
            <Sidenav />
            <Ads />
            <Footer />
          </div> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
