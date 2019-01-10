import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux'

export class Feed extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <nav className="main-nav">
        <h1 className="main-h1">Feed</h1>
        <div className="list-group">
          <a
            className="list-group-item list-group-item-action flex-column align-items-start"
            href="/"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Nav 1</h5>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
        <hr className="my-3" />
        <div className="list-group">
          <a
            className="list-group-item list-group-item-action flex-column align-items-start"
            href="/"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Nav 2</h5>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
        <hr className="my-3" />
        <div className="list-group">
          <a
            className="list-group-item list-group-item-action flex-column align-items-start"
            href="/"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Nav 3</h5>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </nav>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default Feed;
