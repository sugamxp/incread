import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { ThreeHorseLoading } from "react-loadingg";

class UserNameComponent extends Component {
  state = {
    name: "",
    api_url: process.env.REACT_APP_API_URL,
    token: this.props.cookies.get("token"),
    username_update: 0
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
        this.setState({ username_update: 1 });
        console.log(res.data);
      });
  };

  render() {
    if (this.state.username_update) {
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
const mapStateToProps = (state) => ({
  incread_articles_imported: state.auth.incread_articles_imported
});

export default connect(mapStateToProps, null)(withCookies(UserNameComponent));
