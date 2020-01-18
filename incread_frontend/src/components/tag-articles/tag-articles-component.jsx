import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
class TagArticlesComponent extends Component {
  state = {
    user_id: 1,
    articles: [],
    cnt: 0,
    progress_bar_width: 0
  };
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/users/${this.state.user_id}/tag_articles/`)
      .then((res) => {
        this.setState({ articles: res.data });
        console.log(res.data);
      });
  }

  handlePrioritySubmission = (data, e) => {
    e.preventDefault();
    let [priority, article] = data;
    axios
      .post(
        `http://127.0.0.1:8000/users/userArticle/${article.id}/set_priority/`,
        { priority: priority }
      )
      .then((res) => {
        console.log(res);
        if (this.state.cnt === 6) {
          this.props.history.push("/prioritize-list");
        }
        this.setState({
          cnt: this.state.cnt + 1,
          progress_bar_width: this.state.progress_bar_width + 100 / 7
        });
      });
  };
  render() {
    if (this.state.articles.length !== 0) {
      const article = this.state.articles[this.state.cnt];
      return (
        <section id="page-3">
          <div className="container-fluid bg-gray">
            <div className="main-article pb-40">
              <div className="main-container bg-gray">
                <p className="main-article-title text-black">{article.title}</p>
                <div className="text-14-gray ptb-8">
                  by <span>{article.publisher}</span>
                  <span className="plr-20">{article.time_to_read} min</span>
                </div>
                <p className="main-article-content text-dark-gray ptb-20">
                  {article.excerpt.substring(0, 120)}...
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid container-rounded main-rating-outer">
            <div className="main-rating">
              <div className="main-container pt-40">
                <p className="main-article-title text-black">
                  By reading this article, you expect to grow your actionable
                  knowledge
                </p>
                <div className="point-rating ptb-20">
                  <div className="row ptb-15">
                    <div className="col-2 position-relative">
                      <div
                        onClick={this.handlePrioritySubmission.bind(this, [
                          5,
                          article
                        ])}
                        className="rating-icon"
                      >
                        <div className="rating-marks text-gray">5</div>
                      </div>
                    </div>
                    <div className="col pl-10">
                      <p className="rating-title text-black">Significantly</p>
                      <p className="rating-content text-black">
                        Learning which you can apply soon
                      </p>
                      <p className="rating-subcontent text-gray">
                        How-tos, Solutions to current problems
                      </p>
                    </div>
                  </div>

                  <div className="row ptb-15">
                    <div className="col-2 position-relative">
                      <div
                        onClick={this.handlePrioritySubmission.bind(this, [
                          4,
                          article
                        ])}
                        className="rating-icon"
                      >
                        <div className="rating-marks text-gray">4</div>
                      </div>
                    </div>
                    <div className="col pl-10"></div>
                  </div>

                  <div className="row ptb-15">
                    <div className="col-2 position-relative">
                      <div
                        onClick={this.handlePrioritySubmission.bind(this, [
                          3,
                          article
                        ])}
                        className="rating-icon"
                      >
                        <div className="rating-marks text-gray">3</div>
                      </div>
                    </div>
                    <div className="col pl-10">
                      <p className="rating-title text-black">Moderately</p>
                      <p className="rating-content text-black">
                        Learning which you’ll apply later
                      </p>
                      <p className="rating-subcontent text-gray">
                        Cases, Situations you expect to be in someday
                      </p>
                    </div>
                  </div>

                  <div className="row ptb-15">
                    <div className="col-2 position-relative">
                      <div
                        onClick={this.handlePrioritySubmission.bind(this, [
                          2,
                          article
                        ])}
                        className="rating-icon"
                      >
                        <div className="rating-marks text-gray">2</div>
                      </div>
                    </div>
                    <div className="col pl-10"></div>
                  </div>

                  <div className="row ptb-15">
                    <div className="col-2 position-relative">
                      <div
                        onClick={this.handlePrioritySubmission.bind(this, [
                          1,
                          article
                        ])}
                        className="rating-icon"
                      >
                        <div className="rating-marks text-gray">1</div>
                      </div>
                    </div>
                    <div className="col pl-10">
                      <p className="rating-title text-black">Marginally</p>
                      <p className="rating-content text-black">
                        Learning which you might never apply
                      </p>
                      <p className="rating-subcontent text-gray">
                        News, Things that won’t impact your life
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress" style={{ height: "4px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${this.state.progress_bar_width}%` }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}
export default withRouter(TagArticlesComponent);
