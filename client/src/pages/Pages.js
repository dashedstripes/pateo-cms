import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>Page</h1>

        <Link to='/pages/new'>New Page</Link>

        <div>
          <h3>About</h3>

        </div>

        <div>
          <h3>Contact</h3>
        </div>
      </div>
    )
  }
}

export default Home