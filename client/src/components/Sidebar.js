import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div class="sidebar c-b-dark-gray c-white">
        <div class='p-1 t-c'>
          <h4>
            <Link class='c-white' to='/'>PATEO CMS</Link>
          </h4>

          <ul class='list-unstyled p-0 m-b-2'>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>
              <Link to='/objects'>OBJECTS</Link>
            </li>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>
              <Link to='/pages'>PAGES</Link>
            </li>
          </ul>

          <h4>OBJECTS</h4>
          <ul class='list-unstyled p-0 m-b-2'>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>ARTWORK</li>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>PROPERTY</li>
          </ul>

          <h4>PAGES</h4>
          <ul class='list-unstyled p-0'>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>ABOUT</li>
            <li class='c-b-light-gray m-tb-1 p-tb-1 br c-black t-b'>CONTACT</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
