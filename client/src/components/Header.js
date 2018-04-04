import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar__button" id="navbarButton">
          <div className="navbar__button-line"></div>
          <div className="navbar__button-line"></div>
          <div className="navbar__button-line"></div>
        </div>
        <div className="navbar__inner">
          <Link to='/' className="navbar__logo">redact</Link>
          <div className="navbar__collapse" id="navbarCollapse">
            <ul className="nav">
              <li>
                <Link to='/todo'>todolist</Link>
              </li>
              <li>
                <Link to='/about'>about</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
