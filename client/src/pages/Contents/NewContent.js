import React, { Component } from 'react'

class NewContent extends Component {
  render() {
    return (
      <div>
        <p>New content form for a content with object_id: {this.props.match.params.object_id}</p>
      </div>
    )
  }
}

export default NewContent
