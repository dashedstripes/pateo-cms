import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import ContentSystemFields from '../components/ContentSystemFields';

class NewObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      title: '',
      slug: '',
      object: {},
      fields: [],
      fieldInputs: [],
      fieldValues: []
    }

    this.handleAddField = this.handleAddField.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    // Get the field inputs from database and set them in the state object
    let object_id = parseInt(this.props.match.params.object_id)

    Promise.all([
      axios.get(`/api/objects/${object_id}`),
      axios.get(`/api/fields`),
      axios.get(`/api/field_inputs`)
    ]).then((r) => {
      this.setState({
        object: r[0].data,
        fields: r[1].data.filter((field) => field.objectId === object_id),
        fieldInputs: r[2].data,
      })
    }).then(() => {
      this.setState({
        fieldValues: this.state.fields.map((field) => {
          return {
            id: field.id,
            field,
            value: ''
          }
        })
      })
    })
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

  handleChangeFieldValue(id, e) {
    this.setState({
      fieldValues: this.state.fieldValues.map((fieldValue) => {
        if (fieldValue.id === id) fieldValue.value = e.target.value
        return fieldValue
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
    axios.post(`/api/${this.props.type}`, {
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
      .then((res) => {
        this.props.dispatch(fetchObjects())
        this.props.dispatch(fetchPages())
        this.props.history.push(`/${this.props.type}`)
      })
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
    let fields = this.state.fieldValues.map((fieldValue) => {
      return (
        <div key={fieldValue.field.id} class='col-6 mb-3'>
          <div class='form-group'>
            <label>{fieldValue.field.title}</label>
            <div class='input-group'>
              <input class='form-control' type={fieldValue.field.type} value={fieldValue.value} placeholder='' onChange={this.handleChangeFieldValue.bind(this, fieldValue.id)} />
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        <ContentSystemFields
          uiTitle={`New ${this.state.object.title}`}
          title={this.state.title}
          slug={this.state.slug}
          onSave={this.handleSave}
          onTitleChange={this.handleTitleChange}
        />
        <div class='row'>
          {fields}
        </div>
      </div>
    )
  }
}

// Wrap the component with withRouter so that this.props.history.push() works
export default withRouter(connect()(NewObjectForm))
