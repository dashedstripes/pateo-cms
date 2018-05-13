import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div class='py-3'>
        <div class='mb-5'>
          <h5>
            <Link to='/'>pateo cms</Link>
          </h5>

          <div class='list-group'>
            <Link class='list-group-item' to='/objects'>objects</Link>
            <Link class='list-group-item' to='/pages'>pages</Link>
          </div>
        </div>

        <div class='mb-5'>
          <h5>objects</h5>
          <div class='list-group'>
            <Link class='list-group-item' to='/objects/1/contents'>artwork</Link>
            <Link class='list-group-item' to='/objects/2/contents'>property</Link>
          </div>
        </div>

        <div>
          <h5>pages</h5>
          <div class='list-group'>
            <Link class='list-group-item' to='/pages/1'>about</Link>
            <Link class='list-group-item' to='/pages/2'>contact</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
