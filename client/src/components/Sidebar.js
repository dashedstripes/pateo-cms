import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div class="">
        <div>
          <h4>
            <Link to='/'>PATEO CMS</Link>
          </h4>

          <ul class=''>
            <li class=''>
              <Link to='/objects'>OBJECTS</Link>
            </li>
            <li class=''>
              <Link to='/pages'>PAGES</Link>
            </li>
          </ul>

          <h4>OBJECTS</h4>
          <ul class=''>
            <li class=''>
              <Link to='/objects/1/contents'>ARTWORK</Link>
            </li>
            <li class=''>
              <Link to='/objects/2/contents'>PROPERTY</Link>
            </li>
          </ul>

          <h4>PAGES</h4>
          <ul class=''>
            <li class=''>
              <Link to='/pages/1/contents'>ABOUT</Link>
            </li>
            <li class=''>
              <Link to='/pages/2/contents'>CONTACT</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
