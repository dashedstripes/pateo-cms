import React, { Component } from 'react'

class EditContent extends Component {
  render() {
    return (
      <div>
        <p>Edit Content form for content_id: {this.props.match.params.content_id}</p>
      </div>
    )
  }
}

export default EditContent
