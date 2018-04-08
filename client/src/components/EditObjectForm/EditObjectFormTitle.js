import React, { Component } from 'react'

class EditObjectFormTitle extends Component {
  render() {
    return (
      <div>
        <div class='row p-0 p-tb-1'>
          <div class='col-6'>
            <h2 class='m-0 m-t-1'>Edit Object</h2>
          </div>
          <div class='col-6 t-r'>
            <button class='button tertiary m-r-2' disabled={this.props.disabled} onClick={this.props.handleAddField}>ADD FIELD</button>
            <button class='button' disabled={this.props.disabled} onClick={this.props.handleUpdate}>UPDATE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditObjectFormTitle
