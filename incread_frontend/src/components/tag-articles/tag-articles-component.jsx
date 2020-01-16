import React, { Component } from "react";

export default class TagArticlesComponent extends Component {
  render() {
    return (
      <section id="page-3">
        <div class="container-fluid bg-gray">
          <div class="main-article pb-40">
            <div class="main-container bg-gray">
              <p class="main-article-title text-black">
                TikTok’s national security scrutiny tightens as U.S. Navy
                reportedly
              </p>
              <div class="text-14-gray ptb-8">
                by <span>TechCrunch</span>
                <span class="plr-20">3 min</span>
              </div>
              <p class="main-article-content text-dark-gray ptb-20">
                TikTok’s national security scrutiny tightens as U.S. Navy
                reportedly bans popular social app national security scrutiny
              </p>
            </div>
          </div>
        </div>
        <div class="container-fluid container-rounded main-rating-outer">
          <div class="main-rating">
            <div class="main-container pt-40">
              <p class="main-article-title text-black">
                By reading this article, you expect to grow your actionable
                knowledge
              </p>
              <div class="point-rating ptb-20">
                <div class="row ptb-15">
                  <div class="col-2 position-relative">
                    <div class="rating-icon">
                      <div class="rating-marks text-gray">5</div>
                    </div>
                  </div>
                  <div class="col pl-10">
                    <p class="rating-title text-black">Significantly</p>
                    <p class="rating-content text-black">
                      Learning which you can apply soon
                    </p>
                    <p class="rating-subcontent text-gray">
                      How-tos, Solutions to current problems
                    </p>
                  </div>
                </div>

                <div class="row ptb-15">
                  <div class="col-2 position-relative">
                    <div class="rating-icon">
                      <div class="rating-marks text-gray">4</div>
                    </div>
                  </div>
                  <div class="col pl-10"></div>
                </div>

                <div class="row ptb-15">
                  <div class="col-2 position-relative">
                    <div class="rating-icon">
                      <div class="rating-marks text-gray">3</div>
                    </div>
                  </div>
                  <div class="col pl-10">
                    <p class="rating-title text-black">Moderately</p>
                    <p class="rating-content text-black">
                      Learning which you’ll apply later
                    </p>
                    <p class="rating-subcontent text-gray">
                      Cases, Situations you expect to be in someday
                    </p>
                  </div>
                </div>

                <div class="row ptb-15">
                  <div class="col-2 position-relative">
                    <div class="rating-icon">
                      <div class="rating-marks text-gray">2</div>
                    </div>
                  </div>
                  <div class="col pl-10"></div>
                </div>

                <div class="row ptb-15">
                  <div class="col-2 position-relative">
                    <div class="rating-icon">
                      <div class="rating-marks text-gray">1</div>
                    </div>
                  </div>
                  <div class="col pl-10">
                    <p class="rating-title text-black">Marginally</p>
                    <p class="rating-content text-black">
                      Learning which you might never apply
                    </p>
                    <p class="rating-subcontent text-gray">
                      News, Things that won’t impact your life
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="progress" style={{ height: "4px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "75%" }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
