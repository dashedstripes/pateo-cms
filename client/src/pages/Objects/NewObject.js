import React, { Component } from 'react'
import AdminNewForm from '../../containers/AdminNewForm';

class NewObject extends Component {
  render() {
    return (
      <div>
        <AdminNewForm
          uiTitle='New Object'
          type='objects'
        />
      </div>
    )
  }
}

export default NewObject
