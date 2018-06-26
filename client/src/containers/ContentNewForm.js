import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentSystemFields from '../components/ContentSystemFields';
import FormEditField from '../components/FormEditField';

class ContentNewForm extends Component {
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

  createContent() {
    // Create content using the object.id found in this.state.object.id
    axios.post(`/api/contents`, {
      title: this.state.title,
      objectId: parseInt(this.state.object.id)
    }).then((res) => {
      let content = res.data

      // Then, for each field value in this.state.fieldValues
      // create fieldValue using the content.id created before, and the field.id found in the fieldValue object
      return Promise.all(this.state.fieldValues.map((fieldValue) => {
        return axios.post(`/api/field_values`, {
          value: fieldValue.value,
          fieldId: parseInt(fieldValue.field.id),
          contentId: parseInt(content.id)
        })
      }))
    }).then(() => {
      this.props.history.push(`/objects/${this.state.object.id}/contents`)
    })

  }

  handleSave() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    this.createContent()
  }

  render() {
    let fields = this.state.fieldValues.map((fieldValue) => {
      return (
        <FormEditField
          key={field.id}
          title={field.title}
          type={field.type}
          value={field.value.value}
          onChange={this.handleChangeFieldValue.bind(this, field.id)}
        />
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
export default withRouter(connect()(ContentNewForm))
