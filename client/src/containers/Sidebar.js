import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div class='py-3'>
          <div>
            <h5 class='sidebar-heading'>pateo cms</h5>

            <div class='list-group list-group-hover'>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/'>
                <i class="fas fa-tachometer-alt fa-fw sidebar-icon"></i>
                dashboard
              </NavLink>
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>admin</h5>

            <div class='list-group list-group-hover'>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/objects/'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                objects
              </NavLink>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/pages'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                pages
              </NavLink>
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>objects</h5>
            <div class='list-group'>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/objects/1/contents'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                artwork
              </NavLink>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/objects/2/contents'>
                <i class="fas fa-box-open fa-fw sidebar-icon"></i>
                property
              </NavLink>
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>pages</h5>
            <div class='list-group'>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/pages/1/contents'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                about
              </NavLink>
              <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to='/pages/2/contents'>
                <i class="fas fa-file fa-fw sidebar-icon"></i>
                contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
