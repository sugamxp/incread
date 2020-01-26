import React, { Component } from "react";
import login1 from "../static/login1.svg";
import login2 from "../static/login2.svg";
import axios from "axios";
import { SemipolarLoading } from "react-loadingg";
import { Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";

class LoginComponent extends Component {
  state = {
    login_success: 0,
    api_url: process.env.REACT_APP_API_URL
  };

  handleClick = (e) => {
    axios.post(`${this.state.api_url}/users/auth/`).then((res) => {
      console.log(res.data);
      localStorage.setItem("auth_page", "true");
      localStorage.setItem("client_id", res.data.code);
      window.open(res.data.auth_page, "_top");
    });
  };

  componentDidMount() {
    const auth_page = localStorage.getItem("auth_page");
    if (auth_page === "true") {
      const data = { code: localStorage.getItem("client_id") };
      axios
        .post(`${this.state.api_url}/users/get_access_token/`, data)
        .then((res) => {
          localStorage.clear();
          this.props.cookies.set("token", res.data.access_token);
          this.setState({ login_success: 1 });
        });
    }
  }

  render() {
    console.log(window.localStorage);
    const auth_page = localStorage.getItem("auth_page");
    if (this.state.login_success === 1) {
      return <Redirect to="/username" />;
    }
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
            {auth_page ? (
              <SemipolarLoading />
            ) : (
              <button
                onClick={this.handleClick}
                className="btn-general ptb-16 mt-30 btn-login text-dark-gray btn-bg"
              >
                <span className="pocket-svg">
                  <img src="img/pocket.svg" width="25px" height="25px" alt="" />{" "}
                </span>
                Login with Pocket
              </button>
            )}
          </div>
        </div>
        <div className="illustrations">
          <div className="row" style={{ overflow: "hidden" }}>
            <div className="col-7">
              <img src={login1} alt="" />
            </div>
            <div className="col-5" style={{ overflow: "hidden" }}>
              <img src={login2} alt="" className="illus-img" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default withCookies(LoginComponent);
