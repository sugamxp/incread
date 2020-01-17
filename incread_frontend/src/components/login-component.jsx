import React, { Component } from "react";
import axios from "axios";

export default class LoginComponent extends Component {
  render() {
    return (
      <section id="page-1">
        <div className="container-fluid">
          <div className="main-container text-center">
            <div className="login-content">
              <h1 className="main-title text-black">Incread</h1>
              <p className="main-title-content text-black">
                Prioritised reading
              </p>
            </div>
            <button
              onClick={this.handleClick}
              className="btn-general ptb-16 mt-30 btn-login text-dark-gray btn-bg"
            >
              <span className="pocket-svg">
                <img src="img/pocket.svg" width="25px" height="25px" alt="" />{" "}
              </span>
              Login with Pocket
            </button>
          </div>
        </div>
      </section>
    );
  }
}
