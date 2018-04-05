import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Pages extends Component {
  render() {
    let pages = this.props.pages.map((page) => {
      return (
        <div key={page.id}>
          <h3>{page.title}</h3>
          <ul>
            <li>
              <Link to={`/pages/${page.id}/edit`}>Edit</Link>
            </li>
            <li>
              <a href='#'>Delete</a>
            </li>
          </ul>
        </div>
      )
    })

    return (
      <div>
        <h1>Pages</h1>
        <Link to='/pages/new'>New Page</Link>
        {pages}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps)(Pages)
