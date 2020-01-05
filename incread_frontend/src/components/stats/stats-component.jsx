import React, { Component } from "react";
import "./stats-component.css";
import pocket_logo from "../../static/pocket_logo.png";
import axios from "axios";

export default class StatsComponent extends Component {
  state = {
    user_id: 1,
    num_of_articles: 0,
    num_of_publications: 0
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/users/${this.state.user_id}/stats/`)
      .then((res) =>
        this.setState({
          num_of_articles: res.data.no_of_articles,
          num_of_publications: res.data.unique_publishers
        })
      )
      .then((res) => console.log(this.state));
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col ml-5 mt-5 p-0 username ">Aditya</div>
          <div className="col mt-5 text-center">
            <img src={pocket_logo} alt="NoImage" />
          </div>
        </div>
        <div className="row">
          <div className="col ml-5 mt-3 p-0 info-text">
            your Pocket consists of
          </div>
        </div>

        <div className="row mt-5">
          <div className="col num-of text-center ">
            {this.state.num_of_articles}
          </div>
          <div className="col num-of text-center  ">
            {this.state.num_of_publications}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col text-center desc ">Articles</div>
          <div className="col text-center desc ">Publications</div>
        </div>

        <div className="row mt-5">
          <div className="col-2 text-center p-0">
            <div className="pointer ml-5 p-0"></div>
          </div>
          <div className="fact col-10 pr-5">
            It’ll take you __ years to complete your reading list if you read
            for an hour every day
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-2 text-center p-0">
            <div className="pointer ml-5 p-0"></div>
          </div>
          <div className="fact col-10 pr-5">
            It’ll take you __ years to complete your reading list if you read
            for an hour every day
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-2 text-center p-0">
            <div className="pointer ml-5 p-0"></div>
          </div>
          <div className="fact col-10  pr-5">
            It’ll take you __ years to complete your reading list if you read
            for an hour every day
          </div>
        </div>

        <div className="fixed-bottom text-center mb-5">
          <button className="btn-continue text-light">Continue</button>
        </div>
      </div>
    );
  }
}
