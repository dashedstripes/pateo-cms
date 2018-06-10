import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div class='py-3'>
          <div>
            <h5>
              <h5 class='sidebar-heading'>admin</h5>
            </h5>

            <div class='list-group list-group-hover'>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action active' to='/objects'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                objects
              </Link>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' to='/pages'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                pages
              </Link>
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>objects</h5>
            <div class='list-group'>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' to='/objects/1/contents'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                artwork
              </Link>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' to='/objects/2/contents'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                property
              </Link>
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>pages</h5>
            <div class='list-group'>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' to='/pages/1/contents'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                about
              </Link>
              <Link class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' to='/pages/2/contents'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
