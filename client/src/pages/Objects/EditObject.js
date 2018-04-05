import React, { Component } from 'react'

class EditObject extends Component {
  render() {
    return (
      <div>
        <p>Edit Object form for object_id: {this.props.match.params.object_id}</p>
      </div>
    )
  }
}

export default EditObject
