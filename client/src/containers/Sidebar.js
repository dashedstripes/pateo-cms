import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      objects: [],
      pages: []
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/objects'),
      fetch('/api/pages')
    ]).then((res) => {
      return Promise.all(res.map((r) => r.json()))
    }).then((res) => {
      let objects = res[0]
      let pages = res[1]

      this.setState({
        isLoading: false,
        objects,
        pages
      })
    })
  }

  render() {

    let objects = this.state.objects.map((object) => (
      <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to={`/objects/${object.id}/contents`}>
        <i class="fas fa-box-open fa-fw sidebar-icon"></i>
        {object.title.toLowerCase()}
      </NavLink>
    ))

    let pages = this.state.pages.map((page) => (
      <NavLink class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to={`/pages/${page.id}/contents`}>
        <i class="fas fa-file fa-fw sidebar-icon"></i>
        {page.title.toLowerCase()}
      </NavLink>
    ))

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
              {objects}
            </div>
          </div>

          <hr />

          <div>
            <h5 class='sidebar-heading'>pages</h5>
            <div class='list-group'>
              {pages}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
