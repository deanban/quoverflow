import React from 'react';
import PropTypes from 'prop-types';
import Bounce from 'react-reveal/Bounce';

const Header = props => (
  <header className="main-head">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <Bounce top>
          <i className="fab fa-2x fa-quora" />
        </Bounce>
        OverFlow
      </a>
      <div className="container h-50">
        <div className="d-flex h-50">
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <i className="fas fa-2x fa-home" />
                  {'  '}
                  Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <i className="fas fa-2x fa-microphone-alt" />
                  {'  '}
                  Answer
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <i className="far fa-2x fa-bell" />
                  {'  '}
                  Notification
                </a>
              </li>
            </ul>
            <div className="searchbar">
              <input className="search_input" type="text" name="" placeholder="Search..." />
              <a href="#" className="search_icon">
                {'   '}
                <i className="fas fa-search" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item active dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-2x fa-user" aria-hidden="true" />
          </a>
          <div
            className="dropdown-menu"
            x-placement="bottom-start"
            style={{
              position: 'absolute',
              'will-change': 'transform',
              top: '0px',
              left: '0px',
              transform: 'translate3d(0px, 39px, 0px)',
            }}
          >
            <a className="dropdown-item" href="#">
              Profile
            </a>
            <a className="dropdown-item" href="#">
              Following
            </a>
            <a className="dropdown-item" href="#">
              Followers
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {};

export default Header;
