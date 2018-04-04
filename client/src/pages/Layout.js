import React, { Component } from 'react'

import Sidebar from '../components/Sidebar'

import '../sass/style.scss'

class Layout extends Component {
  render() {
    return (
      <div class='app'>
        <Sidebar />
        <div class='main c-b-light-gray'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
