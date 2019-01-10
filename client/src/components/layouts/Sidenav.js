import React from 'react';
import PropTypes from 'prop-types';

const Sidenav = props => (
  <aside className="side">
    <h5 className="main-h5">TAGS</h5>
    <ul>
      <li>
        <a href="/">Nav1</a>
      </li>
      <li>
        <a href="/">Nav2</a>
      </li>
      <li>
        <a href="/">Nav3</a>
      </li>
    </ul>
  </aside>
);

Sidenav.propTypes = {};

export default Sidenav;
