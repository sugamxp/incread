import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StatsComponent from "./components/stats/stats-component";
import TagArticlesComponent from "./components/tag-articles/tag-articles-component";
import LoginComponent from "./components/login-component";
import UserNameComponent from "./components/username-component";
import PrioritizeListComponent from "./components/prioritize-list-component";
import ReadingCompleteComponent from "./components/reading-complete-component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route exact path="/stats" component={StatsComponent} />
            <Route exact path="/username" component={UserNameComponent} />
            <Route
              exact
              path="/tag-articles"
              component={TagArticlesComponent}
            />
            <Route
              exact
              path="/prioritize-list"
              component={PrioritizeListComponent}
            />
            <Route
              exact
              path="/reading-complete"
              component={ReadingCompleteComponent}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
