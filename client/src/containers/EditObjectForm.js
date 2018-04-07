import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchObjects } from '../actions/objectActions'

class EditObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      object: {
        id: 1,
        title: 'Artwork',
        slug: 'artwork'
      },
      fields: [
        {
          id: 1,
          title: 'Name',
          slug: 'name',
          fieldInputId: 2
        },
        {
          id: 2,
          title: 'Medium',
          slug: 'medium',
          fieldInputId: 1
        }
      ],
      fieldInputs: [
        {
          id: 1,
          title: 'Text',
          type: 'text'
        },
        {
          id: 2,
          title: 'Number',
          type: 'number'
        }
      ]
    }
  }

  componentDidMount() {
    // Setup form for current object
    // Need to include object and fields, field values etc

    // Get all objects
    this.props.dispatch(fetchObjects()).then(() => {
      this.props.objects.objects.map((object) => {
        if (object.id == this.props.object_id) {
          this.setState({
            object: object
          })
        }
      })

    })

    // Filter to current object using this.props.object_id

    // Get all fields for object_id

    // Get all field inputs
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
        fieldInputId: 1
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
      return <p>Loading fields...</p>
    }

    if (this.props.objects.error.message) {
      return <p>this.props.objects.error.message</p>
    }

    return (
      <div>
        <h1>Edit {this.state.object.title} Object</h1>
        <button class='button'>Update Object</button>
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
    objects: state.objects
  }
}

export default connect(mapStateToProps)(EditObjectForm)
