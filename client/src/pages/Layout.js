import React, { Component } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

import '../sass/style.scss'

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout
