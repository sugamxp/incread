import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { withCookies } from "react-cookie";

class UserNameComponent extends Component {
  state = {
    name: "",
    api_url: process.env.REACT_APP_API_URL,
    token: this.props.cookies.get("token"),
    update_successfull: 0
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = (e) => {
    axios
      .post(
        `${this.state.api_url}/users/${this.state.token}/update_username/`,
        { username: this.state.name }
      )
      .then((res) => {
        this.setState({ update_successfull: 1 });
        console.log(res.data);
      });
  };

  render() {
    if (this.state.update_successfull === 1) {
      return <Redirect to="/stats" />;
    }
    return (
      <section id="page-2">
        <div className="container-fluid">
          <div className="main-container">
            <p className="text-14-gray"></p>
            <p className="mt-40 main-title-content">
              what's your first <br />
              name?
            </p>
            <input
              autoComplete="off"
              onChange={this.onChange}
              name="name"
              type="text"
              placeholder="eg: John"
              className="mt-30 text-dark-gray"
            />
            <br />
            {this.state.name ? (
              <button
                onClick={this.onClick}
                className="btn-general btn-blue mt-60"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
        {/* <div class="illus-page-2" style={{ overflow: "hidden" }}>
          <img src={username} alt="" />
        </div> */}
      </section>
    );
  }
}
export default withCookies(UserNameComponent);
