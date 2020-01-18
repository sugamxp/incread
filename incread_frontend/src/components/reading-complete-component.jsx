import React, { Component } from "react";
import reading_complete from "../static/reading_complete.svg";

export default class ReadingCompleteComponent extends Component {
  render() {
    return (
      <section id="page-7" class="ht-100">
        <div class="illus-page-7">
          <img src={reading_complete} alt="" />
        </div>
        <div class="container-fluid">
          <div class="main-container-2">
            <div class="user-stats">
              <p class="user-title text-black">Aditya's</p>
              <p class="rating-title text-dark-gray mt-10">
                Prioritised Reading List
              </p>
            </div>
            <div class="user-stats-content mt-20 clearfix">
              <div class="float-left mr-20">
                <p class="user-stats-content-inner text-green">21</p>
                <p class="rating-content text-dark-gray">Articles</p>
              </div>
              <div class="float-left mr-20">
                <p class="user-stats-content-inner text-green">19</p>
                <p class="rating-content text-dark-gray">Minutes</p>
              </div>
            </div>
          </div>
          <div class="border-stats"></div>
          <div class="text-center mt-20">
            <button class="btn-general btn-blue btn-bg">Read More</button>
            <p class="mt-40 done text-blue">Tag 7 new articles</p>
          </div>
        </div>
      </section>
    );
  }
}
