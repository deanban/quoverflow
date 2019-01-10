import React from 'react';
import ScrollToTop from 'react-scroll-up';
import arrow from '../../arrow.svg';

const Footer = () => (
  <footer className="main-footer">
    <ScrollToTop showUnder={1000}>
      <img src={arrow} />
    </ScrollToTop>
  </footer>
);

export default Footer;
