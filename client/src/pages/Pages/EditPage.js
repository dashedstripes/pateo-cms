import React, { Component } from 'react'

class EditPage extends Component {
  render() {
    return (
      <div>
        <p>Edit page form for page_id: {this.props.match.params.page_id}</p>
      </div>
    )
  }
}

export default EditPage
