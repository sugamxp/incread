import React, { Component } from "react";
import pocket_logo from "../../static/pocket.svg";
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
      <section id="page-5">
        <div class="container-fluid">
          <div class="main-container">
            <div class="user-pocket">
              <h1 class="main-title text-black">
                Aditya
                <span class="float-right">
                  <img src={pocket_logo} height="30px" width="32px" alt="" />
                </span>
              </h1>
              <p class="main-title-content text-black">
                your Pocket consists of
              </p>
            </div>
            <div class="user-info">
              <div class="row">
                <div class="col">
                  <p class="text-green number-info">
                    {this.state.num_of_articles}
                  </p>
                  <p class="main-title-content text-black articles">Articles</p>
                </div>
                <div class="col">
                  <p class="text-green number-info">
                    {this.state.num_of_publications}
                  </p>
                  <p class="main-title-content text-black articles">
                    Publications
                  </p>
                </div>
              </div>
            </div>
            <div class="extra-info mt-60">
              <div class="row row-ptb-16">
                <div class="col-2 position-relative">
                  <div class="rating-icon-2"></div>
                </div>
                <div class="col pl-10">
                  <p class="rating-title text-gray">
                    It’ll take you __ years to complete your reading list if you
                    read for an hour every day
                  </p>
                </div>
              </div>
              <div class="row row-ptb-16">
                <div class="col-2 position-relative">
                  <div class="rating-icon-2"></div>
                </div>
                <div class="col pl-10">
                  <p class="rating-title text-gray">
                    __ % of your reading list is from medium.com followed by __
                    % from linkedin.com
                  </p>
                </div>
              </div>
              <div class="row row-ptb-16">
                <div class="col-2 position-relative">
                  <div class="rating-icon-2"></div>
                </div>
                <div class="col pl-10">
                  <p class="rating-title text-gray">
                    Reading 5789 articles is equivalent to researching for __
                    PhDs
                  </p>
                </div>
              </div>
            </div>
            <div class="text-center mt-40">
              <button class="btn-general btn-blue btn-bg">Continue</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
