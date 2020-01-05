import React, { Component } from "react";
import "./tag-articles-component.css";

export default class TagArticlesComponent extends Component {
  render() {
    return (
      <div className="tag-articles">
        <div className="title pt-5">
          TikTok’s national security scrutiny tightens as U.S. Navy reportedly
        </div>

        <div className="info mt-3">
          <span>by TechCrunch</span>
          <span className="ml-4">3 mins</span>
        </div>

        <div className="excerpt mt-4">
          TikTok’s national security scrutiny tightens as U.S. Navy reportedly
          bans popular social app national security scrutiny
        </div>

        <div className="priority mt-5">
          <div className="prompt text-center">
            By reading this article, you expect to grow your actionable
            knowledge
          </div>
        </div>
      </div>
    );
  }
}
