import React, { Component } from 'react'

import Sidebar from '../containers/Sidebar'

import '../sass/style.scss'

class Layout extends Component {
  render() {
    return (
      <div class='app'>
        <div class='sidebar'>
          <Sidebar />
        </div>
        <div class='main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
