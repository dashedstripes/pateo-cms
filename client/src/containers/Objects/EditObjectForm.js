import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const defaultState = {
  id: 1, // object_id
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

class EditObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      id: 1,
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
    this.fetchObjectsAndFields()
    this.fetchFieldInputs()
  }

  fetchObjectsAndFields() {
    // Get object from database using id in req.params
    // this.props.object_id returns a string, so we parse it to an int
    let objectId = parseInt(this.props.object_id)

    axios.get('/api/objects/' + objectId)
      .then((res) => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          slug: res.data.slug
        })
      })
      // After we've set the object, get and set the fields for this object
      .then(() => {
        return axios.get('/api/fields')
      })
      .then((res) => {
        let fields = res.data
        // We only want the fields that have the objectId equal to the current object
        this.setState({
          fields: fields.filter((field) => field.objectId === objectId)
        })
      })
      .catch((err) => console.log(err))
  }

  fetchFieldInputs() {
    // Get and set field inputs 
    // This doesn't rely on anything so can be done separately to objects and fieldInputs
    axios.get('/api/field_inputs')
      .then((res) => {
        this.setState({
          fieldInputs: res.data
        })
      })
      .catch((err) => console.log(err))
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
      fields: [...this.state.fields, { id: Date.now(), title: 'Untitled Field', type: 'text' }]
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

  updateObjectAndFields() {
    // Update the current object
    axios.put('/api/objects/' + this.state.id, {
      title: this.state.title
    }).then((res) => this.props.history.push('/objects'))
      // TODO: Better error handling
      .catch((err) => this.setState({ isLoading: false }))

    // TODO: Update fields if they exist, create fields if they don't.
  }

  handleSave() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    this.updateObjectAndFields()
  }

  render() {
    let fields = this.state.fields.map((field) => {
      return (
        <div key={field.id} class='col-6 mb-3'>
          <div class='form-group'>
            <div class='input-group'>
              <input class='form-control' type='text' value={field.title} onChange={this.handleChangeFieldTitle.bind(this, field.id)} />
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
            <h3>{this.state.title}</h3>
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
              <input class='form-control' type='text' value={this.state.title} onChange={this.handleTitleChange} />
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

export default withRouter(EditObjectForm)
