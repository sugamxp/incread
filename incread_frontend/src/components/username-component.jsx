import React, { Component } from "react";

export default class UserNameComponent extends Component {
  render() {
    return (
      <section id="page-2">
        <div className="container-fluid">
          <div className="main-container">
            <p className="text-14-gray">1/3</p>
            <p className="mt-40 main-title-content">
              what's your first <br />
              name?
            </p>
            <input
              type="text"
              placeholder="eg: John"
              className="mt-30 text-dark-gray"
            />
            <br />
            <button className="btn-general btn-blue mt-60">Next</button>
          </div>
        </div>
      </section>
    );
  }
}
