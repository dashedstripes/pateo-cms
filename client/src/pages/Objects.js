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
          <ul>
            <li>
              <Link to='/objects/1/edit'>Edit</Link>
            </li>
            <li>
              <a href='#'>Delete</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Property</h3>
          <ul>
            <li>
              <Link to='/objects/2/edit'>Edit</Link>
            </li>
            <li>
              <a href='#'>Delete</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
