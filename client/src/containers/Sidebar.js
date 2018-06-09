import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div class='py-3'>
        <div class='mb-5'>
          <h5>
            <Link class='sidebar-heading' to='/'>pateo cms</Link>
          </h5>

          <div class='list-group list-group-hover'>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/objects'>
              <span class="badge badge-pill"><i class="fas fa-box-open"></i></span>
              objects
            </Link>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/pages'>
              <span class="badge badge-pill"><i class="fas fa-file"></i></span>
              pages
            </Link>
          </div>
        </div>

        <div class='mb-5'>
          <h5 class='sidebar-heading'>objects</h5>
          <div class='list-group'>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/objects/1/contents'>artwork</Link>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/objects/2/contents'>property</Link>
          </div>
        </div>

        <div>
          <h5 class='sidebar-heading'>pages</h5>
          <div class='list-group'>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/pages/1/contents'>about</Link>
            <Link class='list-group-item sidebar-list-item list-group-item-action' to='/pages/2/contents'>contact</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
