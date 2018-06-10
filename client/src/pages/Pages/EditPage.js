import React, { Component } from 'react'
import AdminEditForm from '../../containers/AdminEditForm';

class EditPage extends Component {
  render() {
    return (
      <div>
        <AdminEditForm
          id={this.props.match.params.page_id}
          type='pages'
        />
      </div>
    )
  }
}

export default EditPage
