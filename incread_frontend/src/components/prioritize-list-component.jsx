import React, { Component } from "react";
import article_img from "../static/article_img.jpg";

export default class PrioritizeListComponent extends Component {
  render() {
    return (
      <section id="page-6">
        <div className="main-container-2">
          <div className="user-reading">
            <div className="row">
              <div className="col">
                <p className="user-title text-black">Aditya's</p>
                <p className="rating-title text-dark-gray mt-10">
                  Prioritised Reading List
                </p>
              </div>
              <div className="col position-relative">
                <button className="btn-general btn-white btn-white-sm user-button-position float-right">
                  + 12 New
                </button>
              </div>
            </div>
          </div>
          <div className="user-reading-list mt-20">
            <div className="row ptb-20 position-relative">
              <div className="col-9 pr-16">
                <p className="rating-title text-black">
                  Apple reportedly working on satellite technology for direct
                  wireless iPhone data transmission
                </p>
                <div className="mt-10 rating-content text-gray">
                  techcrunch.com
                </div>
              </div>
              <div className="col-3">
                <img
                  src={article_img}
                  width="80px"
                  height="45px"
                  alt=""
                  className="float-right"
                />
              </div>
              <p className="text-yellow mt-20 done" id="done1">
                Mark as Done
              </p>
              <div className="green-overlay">
                <p className="green-overlay-content">
                  <i className="fa fa-check mr-10"></i>Done
                </p>
              </div>
            </div>
            <div className="row ptb-20">
              <div className="col-9 pr-16">
                <p className="rating-title text-black">
                  Thoughts on Travis Kalanick
                </p>
                <div className="mt-10 rating-content text-gray">
                  linkedin.com<span className="ml-10">2 min</span>
                </div>
              </div>
              <div className="col-3">
                <img
                  src={article_img}
                  width="80px"
                  height="45px"
                  alt=""
                  className="float-right"
                />
              </div>
            </div>
            <div className="row ptb-20">
              <div className="col-9 pr-16">
                <p className="rating-title text-black">
                  What is Jobs to be Done?
                </p>
                <div className="mt-10 rating-content text-gray">
                  justinjackson.co<span className="ml-10">3 min</span>
                </div>
              </div>
              <div className="col-3">
                <img
                  src={article_img}
                  width="80px"
                  height="45px"
                  alt=""
                  className="float-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
