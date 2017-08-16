import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// 에셋을 직접 삽입할 수 있으나 빌드에서 이 이미지를 따로 이미지 폴더로 이동하도록 하지는 않은  상태임. 우선 css에만 이미지 사용
import logo from 'images/logo.svg';

import 'css/header.css';

class Header extends Component {
  render() {
    return(
      <div id="header">
        <div className="title">
          <Link to="/">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="logo"></div>
            <div className="service">React Boilerplate</div>
          </Link>
        </div>
        <div className="navi">
          <NavLink to="/about" activeClassName="on">about</NavLink>
          <NavLink to="/fake" activeClassName="on">fake</NavLink>
          <NavLink to="/board/0" activeClassName="on">board</NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
