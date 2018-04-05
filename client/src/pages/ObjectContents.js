import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ObjectContents extends Component {
  render() {
    return (
      <div>
        <h1>ObjectContents for object_id: {this.props.match.params.object_id}</h1>
        <h3>But for testing purposes the static content here relates to object "ARTWORK"</h3>

        <Link to={`/objects/${this.props.match.params.object_id}/contents/new`}>
          New Content for object_id: {this.props.match.params.object_id}
        </Link>

        <div>
          <h3>Miranda</h3>
          <ul>
            <li>
              <Link to={`/contents/1/edit`}>Edit</Link>
            </li>
            <li>
              <a href='#'>Delete</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Foster Child</h3>
          <ul>
            <li>
              <Link to={`/contents/2/edit`}>Edit</Link>
            </li>
            <li>
              <a href='#'>Delete</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ObjectContents
