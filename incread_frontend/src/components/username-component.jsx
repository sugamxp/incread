import React, { Component } from "react";

export default class UserNameComponent extends Component {
  render() {
    return (
      <section id="page-2">
        <div class="container-fluid">
          <div class="main-container">
            <p class="text-14-gray">1/3</p>
            <p class="mt-40 main-title-content">
              what's your first <br />
              name?
            </p>
            <input
              type="text"
              placeholder="eg: John"
              class="mt-30 text-dark-gray"
            />
            <br />
            <button class="btn-general btn-blue mt-60">Next</button>
          </div>
        </div>
      </section>
    );
  }
}
