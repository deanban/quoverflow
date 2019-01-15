import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Landing extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="landing-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2" />
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true" />
              </div>
              <div className="col-lg-12 login-title">
                <h3>qoverflow</h3>
              </div>

              <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                  <form>
                    <div className="form-group">
                      <label className="form-control-label">USERNAME</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">PASSWORD</label>
                      <input type="password" className="form-control" i />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="col-lg-2 login-btm login-text" />
                      <div className="col-lg-8 login-btm login-button">
                        <button
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          LOG IN
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default Landing;
