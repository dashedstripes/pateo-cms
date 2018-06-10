import React, { Component } from 'react'
import AdminEditForm from '../../containers/AdminEditForm';

class EditObject extends Component {
  render() {
    return (
      <div>
        <AdminEditForm
          id={this.props.match.params.object_id}
          type='objects'
        />
      </div>
    )
  }
}

export default EditObject
