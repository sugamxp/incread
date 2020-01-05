import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StatsComponent from "./components/stats/stats-component";
import TagArticlesComponent from "./components/tag-articles/tag-articles-component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={StatsComponent} />
            <Route
              exact
              path="/tag-articles"
              component={TagArticlesComponent}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
