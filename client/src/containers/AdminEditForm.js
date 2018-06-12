import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import AdminField from '../components/AdminField';
import AdminSystemFields from '../components/AdminSystemFields';

class AdminEditForm extends Component {
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
    let id = parseInt(this.props.id)

    axios.get(`/api/${this.props.type}/${id}`)
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
        // We only want the fields that have the id equal to the current object
        if (this.props.type === 'objects') {
          this.setState({
            fields: fields.filter((field) => field.objectId === id)
          })
        }

        if (this.props.type === 'pages') {
          this.setState({
            fields: fields.filter((field) => field.pageId === id)
          })
        }
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
      fields: [
        ...this.state.fields,
        {
          id: Date.now(),
          title: '',
          type: 'text',
          objectId: this.state.id,
          new: true
        }
      ]
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
    axios.delete('/api/fields/' + id)
      .then((res) => {
        this.setState({
          fields: [...this.state.fields.filter((field) => field.id !== id)]
        })
      })
      .catch((err) => console.log(err))
  }

  updateObjectAndFields() {
    // Update the current object
    axios.put(`/api/${this.props.type}/${this.state.id}`, {
      title: this.state.title
    }).then((res) => this.props.history.push(`/${this.props.type}`))
      // TODO: Better error handling
      .catch((err) => this.setState({ isLoading: false }))

    let fieldsToCreate = []
    let fieldsToUpdate = []
    // Update fields if they exist, create fields if they don't.
    this.state.fields.map((field) => {
      // If it's a new field, create it.
      if (field.new) {
        fieldsToCreate.push(
          axios.post('/api/fields/', {
            title: field.title,
            objectId: this.props.type === 'objects' ? this.state.id : null,
            pageId: this.props.type === 'pages' ? this.state.id : null,
            fieldInputId: this.state.fieldInputs.filter((fieldInput) => fieldInput.type === field.type)[0].id
          })
        )
        // If it's an existing field, update it.
      } else {
        fieldsToUpdate.push(
          axios.put('/api/fields/' + field.id, {
            title: field.title,
            objectId: this.props.type === 'objects' ? this.state.id : null,
            pageId: this.props.type === 'pages' ? this.state.id : null,
            fieldInputId: field.fieldInputId
          })
        )
      }
    })

    Promise.all(fieldsToCreate, fieldsToUpdate)
      .then((res) => {
        this.props.dispatch(fetchObjects())
        this.props.dispatch(fetchPages())
        this.setState({
          isLoading: false
        })
      })
      .catch((err) => console.log(err))

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
          uiTitle={this.state.title}
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

export default withRouter(connect()(AdminEditForm))
