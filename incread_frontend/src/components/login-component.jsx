import React, { Component } from "react";
import login1 from "../static/login1.svg";
import login2 from "../static/login2.svg";
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
        <div class="illustrations">
          <div class="row" style={{ overflow: "hidden" }}>
            <div class="col-7">
              <img src={login1} alt="" />
            </div>
            <div class="col-5" style={{ overflow: "hidden" }}>
              <img src={login2} alt="" class="illus-img" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
