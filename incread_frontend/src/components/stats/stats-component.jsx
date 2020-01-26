import React, { Component } from "react";
import pocket_logo from "../../static/pocket.svg";
import axios from "axios";
import { withCookies } from "react-cookie";
import { ThreeHorseLoading } from "react-loadingg";
import { Link } from "react-router-dom";

class StatsComponent extends Component {
  state = {
    username: "",
    token: this.props.cookies.get("token"),
    num_of_articles: 0,
    num_of_publications: 0,
    api_url: process.env.REACT_APP_API_URL,
    get_stats: 0
  };
  componentDidMount() {
    axios
      .post(
        `${this.state.api_url}/users/${this.state.token}/get_latest_articles/`
      )
      .then((res) => {
        axios
          .get(`${this.state.api_url}/users/${this.state.token}/stats/`)
          .then((res) =>
            this.setState({
              username: res.data.username,
              num_of_articles: res.data.no_of_articles,
              num_of_publications: res.data.unique_publishers,
              get_stats: 1
            })
          );
      });
  }

  render() {
    if (this.state.get_stats) {
      return (
        <section id="page-5">
          <div className="container-fluid">
            <div className="main-container">
              <div className="user-pocket">
                <h1 className="main-title text-black">
                  {this.state.username}
                  <span className="float-right">
                    <img src={pocket_logo} height="30px" width="32px" alt="" />
                  </span>
                </h1>
                <p className="main-title-content text-black">
                  your Pocket consists of
                </p>
              </div>
              <div className="user-info">
                <div className="row">
                  <div className="col">
                    <p className="text-green number-info">
                      {this.state.num_of_articles}
                    </p>
                    <p className="main-title-content text-black articles">
                      Articles
                    </p>
                  </div>
                  <div className="col">
                    <p className="text-green number-info">
                      {this.state.num_of_publications}
                    </p>
                    <p className="main-title-content text-black articles">
                      Publications
                    </p>
                  </div>
                </div>
              </div>
              <div className="extra-info mt-60">
                <div className="row row-ptb-16">
                  <div className="col-2 position-relative">
                    <div className="rating-icon-2"></div>
                  </div>
                  <div className="col pl-10">
                    <p className="rating-title text-gray">
                      It’ll take you __ years to complete your reading list if
                      you read for an hour every day
                    </p>
                  </div>
                </div>
                <div className="row row-ptb-16">
                  <div className="col-2 position-relative">
                    <div className="rating-icon-2"></div>
                  </div>
                  <div className="col pl-10">
                    <p className="rating-title text-gray">
                      __ % of your reading list is from medium.com followed by
                      __ % from linkedin.com
                    </p>
                  </div>
                </div>
                <div className="row row-ptb-16">
                  <div className="col-2 position-relative">
                    <div className="rating-icon-2"></div>
                  </div>
                  <div className="col pl-10">
                    <p className="rating-title text-gray">
                      Reading {this.state.no_of_articles} articles is equivalent
                      to researching for __ PhDs
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-40">
                <button className="btn-general btn-blue btn-bg">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <ThreeHorseLoading />
        </div>
      );
    }
  }
}
export default withCookies(StatsComponent);
