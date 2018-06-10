import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.dispatch(fetchObjects())
    this.props.dispatch(fetchPages())
  }

  render() {

    let objects = this.props.objects.map((object) => (
      <NavLink key={object.id} class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to={`/objects/${object.id}/contents`}>
        <i class="fas fa-box-open fa-fw sidebar-icon"></i>
        {object.title.toLowerCase()}
      </NavLink>
    ))

    let pages = this.props.pages.map((page) => (
      <NavLink key={page.id} class='list-group-item sidebar-list-item sidebar-list-item list-group-item-action' exact activeClassName="active" to={`/pages/${page.id}/contents`}>
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

function mapStateToProps(state) {
  return {
    objects: state.objects.objects,
    pages: state.pages.pages
  }
}

export default connect(mapStateToProps)(Sidebar)
