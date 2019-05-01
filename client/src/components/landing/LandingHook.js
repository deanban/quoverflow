import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const initialState = {
  username: "",
  password: ""
};
function Landing() {
  const [form, setForm] = useState(initialState);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

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
              <h3>quoverflow</h3>
            </div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">USERNAME</label>
                    <input
                      value={form.username}
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      value={form.password}
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                    />
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

export default Landing;
