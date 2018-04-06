import React, { Component } from 'react'
import EditObjectForm from '../../containers/EditObjectForm';

class EditObject extends Component {
  render() {
    return (
      <div>
        <EditObjectForm object_id={this.props.match.params.object_id} />
      </div>
    )
  }
}

export default EditObject
