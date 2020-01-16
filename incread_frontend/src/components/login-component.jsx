import React, { Component } from "react";

export default class LoginComponent extends Component {
  render() {
    return (
      <section id="page-1">
        <div class="container-fluid">
          <div class="main-container text-center">
            <div class="login-content">
              <h1 class="main-title text-black">Incread</h1>
              <p class="main-title-content text-black">Prioritised reading</p>
            </div>
            <button
              class="btn-general ptb-16 mt-30 btn-login text-dark-gray btn-bg"
              href="page-2.html"
            >
              <span class="pocket-svg">
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
