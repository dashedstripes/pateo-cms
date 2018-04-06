import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ObjectListItem extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul>
          <li>
            <Link to={`/objects/${this.props.id}/edit`}>Edit</Link>
          </li>
          <li>
            <a href='#'>Delete</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default ObjectListItem
