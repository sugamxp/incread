import React, { Component } from "react";
import login1 from "../../static/login1.svg";
import login2 from "../../static/login2.svg";
import axios from "axios";
import { SemipolarLoading } from "react-loadingg";
import { Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { getArticlesPocket } from "../../actions/authActions";

class LoginComponent extends Component {
  state = {
    login_success: 0
  };

  handleClick = (e) => {
    axios.post(`${this.props.api_url}/users/auth/`).then((res) => {
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
        .post(`${this.props.api_url}/users/get_access_token/`, data)
        .then((res) => {
          localStorage.clear();
          this.props.cookies.set("token", res.data.access_token);
          this.props.getArticlesPocket(
            this.props.api_url,
            res.data.access_token
          );
          this.setState({ login_success: 1 });
        });
    }
  }

  render() {
    console.log(this.props.api_url);
    const auth_page = localStorage.getItem("auth_page");
    if (this.state.login_success === 1) {
      return <Redirect to="/username" />;
    }
    return (
      <section>
        <div className="container-fluid">
          <div className="main-container text-center">
            <div className="login-content">
              <h1 className="main-title text-black animated fadeInDown">
                Incread
              </h1>
              <p className="main-title-content text-black animated fadeInDown delay-1s">
                Prioritised reading
              </p>
            </div>
            {auth_page ? (
              <SemipolarLoading />
            ) : (
              <button
                onClick={this.handleClick}
                className="btn-general ptb-16 mt-30 btn-login text-dark-gray btn-bg animated fadeIn delay-2s"
              >
                <span className="pocket-svg">
                  <img src="img/pocket.svg" alt="" />{" "}
                </span>
                Login with Pocket
              </button>
            )}
          </div>
        </div>
        <div className="illustrations">
          <div
            className="row animated fadeIn delay-2s"
            style={{ overflow: "hidden" }}
          >
            <div className="col-7">
              <img src={login1} alt="" style={{ width: "59vw" }} />
            </div>
            <div className="col-5" style={{ overflow: "hidden" }}>
              <img
                src={login2}
                alt=""
                className="illus-img"
                style={{ width: "60vw" }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  api_url: state.auth.api_url
});

export default connect(mapStateToProps, { getArticlesPocket })(
  withCookies(LoginComponent)
);
