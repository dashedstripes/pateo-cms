import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>Objects</h1>

        <Link to='/objects/new'>New Object</Link>

        <div>
          <h3>Artwork</h3>
        </div>

        <div>
          <h3>Property</h3>
        </div>
      </div>
    )
  }
}

export default Home
