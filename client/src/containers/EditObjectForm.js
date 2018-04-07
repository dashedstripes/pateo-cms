import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'

import { fetchObjects } from '../actions/objectActions'
import { fetchFieldInputs } from '../actions/fieldinputActions'
import { fetchFields, updateFields } from '../actions/fieldActions'

class EditObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      object: {},
      fields: [],
      fieldInputs: []
    }
  }

  componentDidMount() {

    // Get all objects
    this.props.dispatch(fetchObjects()).then(() => {
      this.props.objects.objects.forEach((object) => {
        if (object.id == this.props.object_id) {
          this.setState({
            object: object
          })
        }
      })
    }).then(() => {
      // Get all fields
      return this.props.dispatch((fetchFields()))
    }).then(() => {
      this.setState({
        fields: this.props.fields.fields.filter((field) => {
          if (field.objectId == this.props.object_id) {
            return field
          }
        })
      })
    })

    // Get all field Inputs
    this.props.dispatch(fetchFieldInputs()).then(() => {
      this.setState({
        fieldInputs: this.props.fieldInputs.fieldInputs
      })
    })

  }

  handleSelectChange(fieldId, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === fieldId) {
          field.fieldInputId = e.target.value
        }
        return field
      })
    })
  }

  handleInputChange(fieldId, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === fieldId) {
          field.title = e.target.value
        }
        return field
      })
    })
  }

  handleNewField(e) {
    this.setState({
      fields: this.state.fields.concat({
        id: Date.now(),
        title: 'Untitled Field',
        slug: 'untitled-field',
        fieldInputId: 1,
        newField: true
      })
    })
  }

  handleDeleteField(fieldId, e) {
    this.setState({
      fields: this.state.fields.filter((field) => {
        if (field.id !== fieldId) {
          return field
        }
      })
    })
  }

  handleUpdate() {
    let fieldPromises = this.state.fields.map((field) => {
      if (field.newField) {
        return axios.post(`/api/fields`, {
          title: field.title,
          fieldInputId: field.fieldInputId,
          objectId: this.state.object.id
        })
      } else {
        return axios.put(`/api/fields/${field.id}`, field)
      }
    })

    this.props.dispatch(updateFields(fieldPromises))
  }

  render() {
    let fields = this.state.fields.map((field) => {
      let fieldInputs = this.state.fieldInputs.map((fieldInput) => {
        return <option key={fieldInput.id} value={fieldInput.id}>{fieldInput.title}</option>
      })

      return (
        <div key={field.id} class='col-6 p-l-0 p-r-0'>
          <input type='text' value={field.title} onChange={this.handleInputChange.bind(this, field.id)} />
          <select value={field.fieldInputId} onChange={this.handleSelectChange.bind(this, field.id)}>
            {fieldInputs}
          </select>
          <button class='ion-ios-trash' onClick={this.handleDeleteField.bind(this, field.id)}></button>
        </div>
      )
    })

    if (this.props.objects.pending) {
      return <p>Loading objects...</p>
    }

    if (this.props.fields.pending) {
      return <p>Loading fields...</p>
    }

    if (this.props.objects.error.message) {
      return <p>{this.props.objects.error.message}</p>
    }

    if (this.props.fields.error.message) {
      return <p>{this.props.fields.error.message}</p>
    }

    return (
      <div>
        <h1>Edit {this.state.object.title} Object</h1>
        <button class='button' onClick={this.handleUpdate.bind(this)}>Update Object</button>
        <button class='button tertiary' onClick={this.handleNewField.bind(this)}>New Field</button>
        <div class='row p-0 p-tb-1'>
          {fields}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    objects: state.objects,
    fieldInputs: state.fieldInputs,
    fields: state.fields
  }
}

export default connect(mapStateToProps)(EditObjectForm)
