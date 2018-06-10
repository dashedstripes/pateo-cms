import React, { Component } from 'react'
import AdminNewForm from '../../containers/AdminNewForm';

class NewPage extends Component {
  render() {
    return (
      <div>
        <AdminNewForm
          uiTitle='New Page'
          type='pages'
        />
      </div>
    )
  }
}

export default NewPage
