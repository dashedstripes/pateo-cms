import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const defaultState = {
  title: 'Artwork',
  slug: 'artwork',
  fields: [
    {
      id: 1,
      title: 'description',
      type: 'text'
    },
    {
      id: 2,
      title: 'floorspace',
      type: 'number'
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

class NewObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      title: '',
      slug: '',
      fields: [],
      fieldInputs: []
    }

    this.handleAddField = this.handleAddField.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    // Get the field inputs from database and set them in the state object
    axios.get('/api/field_inputs')
      .then((res) => this.setState({ fieldInputs: res.data }))
      // TODO: Better error handling
      .catch((err) => console.log(error))
  }

  // This also generates a slug based on the title
  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      slug: e.target.value.replace(/\s+/g, '-').toLowerCase()
    })
  }

  handleAddField() {
    this.setState({
      fields: [...this.state.fields, { id: Date.now(), title: '', type: 'text' }]
    })
  }

  handleChangeFieldTitle(id, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === id) field.title = e.target.value
        return field
      })
    })
  }

  handleChangeFieldType(id, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === id) field.type = e.target.value
        return field
      })
    })
  }

  handleDeleteField(id) {
    this.setState({
      fields: [...this.state.fields.filter((field) => field.id !== id)]
    })
  }

  postObjectAndFields() {
    // Because we have an unknown amount of fields, we will need to store each post request
    // into an array, then use Promise.all to post them all async.
    let fieldPromises = []

    // Create object in the database and retrieve the ID to create fields
    axios.post('/api/objects', {
      title: this.state.title
    }).then((res) => {
      this.state.fields.map((field) => {
        fieldPromises.push(
          axios.post('/api/fields', {
            title: field.title,
            objectId: res.data.id, // The ID of the object we just created.

            // We've got to get the ID for the selected fieldInput for this field.
            // We loop through each fieldInput, and filter down to the one that matches the type set on the 
            // current field, as .filter returns an array, we get the item at [0] and grab the id.
            fieldInputId: this.state.fieldInputs.filter((fieldInput) => fieldInput.type === field.type)[0].id
          })
        )
      })

      return Promise.all(fieldPromises)
    })
      // Use history.push to change back to the objects list after the object is created.
      .then((res) => this.props.history.push('/objects'))
      // TODO: Better error handling
      .catch((err) => this.setState({ isLoading: false }))
  }

  handleSave() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    this.postObjectAndFields()
  }

  render() {
    let fields = this.state.fields.map((field) => {
      return (
        <div key={field.id} class='col-6 mb-3'>
          <div class='form-group'>
            <div class='input-group'>
              <input class='form-control' type='text' value={field.title} placeholder="Enter a field name..." onChange={this.handleChangeFieldTitle.bind(this, field.id)} />
              <div class="input-group-append">
                <button class="btn btn-outline-danger" type="button" onClick={this.handleDeleteField.bind(this, field.id)}>
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <select class='form-control mb-2' value={field.type} onChange={this.handleChangeFieldType.bind(this, field.id)}>
              {this.state.fieldInputs.map((fieldInput) => {
                return <option key={fieldInput.id} value={fieldInput.type}>{fieldInput.title}</option>
              })}
            </select>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div class='row pb-4'>
          <div class='col-6'>
            <h3>New Object</h3>
          </div>
          <div class='col-6'>
            <div class='btn-group float-right'>
              <button class='btn btn-primary' onClick={this.handleAddField}>Add Field</button>
              <button class='btn btn-success' onClick={this.handleSave} disabled={this.state.title === ''}>Save</button>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-6'>
            <div class='form-group'>
              <label>Title</label>
              <input class='form-control' type='text' placeholder="Object Name" value={this.state.title} onChange={this.handleTitleChange} />
            </div>
          </div>
          <div class='col-6'>
            <div class='form-group'>
              <label>Slug</label>
              <input class='form-control' type='text' value={this.state.slug} disabled />
            </div>
          </div>
        </div>
        <div class='row'>
          {fields}
        </div>
      </div>
    )
  }
}

// Wrap the component with withRouter so that this.props.history.push() works
export default withRouter(NewObjectForm)
