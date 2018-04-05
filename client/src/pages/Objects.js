import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Objects extends Component {
  render() {
    let objects = this.props.objects.map((object) => {
      return (
        <div key={object.id}>
          <h3>{object.title}</h3>
          <ul>
            <li>
              <Link to={`/objects/${object.id}/edit`}>Edit</Link>
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
        <h1>Objects</h1>
        <Link to='/objects/new'>New Object</Link>
        {objects}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    objects: state.objects
  }
}

export default connect(mapStateToProps)(Objects)
