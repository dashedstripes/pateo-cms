import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import AdminField from '../components/AdminField';
import AdminSystemFields from '../components/AdminSystemFields';

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
    axios.post(`/api/${this.props.type}`, {
      title: this.state.title
    }).then((res) => {
      this.state.fields.map((field) => {
        if (this.props.type === 'objects') {
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
        }

        if (this.props.type === 'pages') {
          fieldPromises.push(
            axios.post('/api/fields', {
              title: field.title,
              pageId: res.data.id, // The ID of the object we just created.

              // We've got to get the ID for the selected fieldInput for this field.
              // We loop through each fieldInput, and filter down to the one that matches the type set on the 
              // current field, as .filter returns an array, we get the item at [0] and grab the id.
              fieldInputId: this.state.fieldInputs.filter((fieldInput) => fieldInput.type === field.type)[0].id
            })
          )
        }
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
    let fields = this.state.fields.map((field) => {
      return (
        <div key={field.id} class='col-6 mb-3'>
          <AdminField
            value={field.title}
            type={field.type}
            fieldInputs={this.state.fieldInputs}
            onChange={this.handleChangeFieldTitle.bind(this, field.id)}
            onDelete={this.handleDeleteField.bind(this, field.id)}
            onFieldTypeChange={this.handleChangeFieldType.bind(this, field.id)}
          />
        </div>
      )
    })

    return (
      <div>
        <AdminSystemFields
          uiTitle={this.props.uiTitle}
          title={this.state.title}
          slug={this.state.slug}
          onAddField={this.handleAddField}
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
