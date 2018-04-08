import React, { Component } from 'react'

class EditObjectFormTitle extends Component {
  render() {
    return (
      <div>
        <div class='row p-0 p-tb-1'>
          <div class='col-6'>
            <h2 class='m-0 m-t-1'>Edit {this.props.title} Object</h2>
          </div>
          <div class='col-6 t-r'>
            <button class='button tertiary m-r-2' onClick={this.props.handleAddField}>ADD FIELD</button>
            <button class='button' onClick={this.props.handleUpdate}>UPDATE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditObjectFormTitle
