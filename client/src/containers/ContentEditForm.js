import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentSystemFields from '../components/ContentSystemFields';

class ContentEditForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      content: {},
      fields: [],
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    let content_id = parseInt(this.props.match.params.content_id)

    Promise.all([
      // Get the content by using this.props.match.params.content_id
      axios.get(`/api/contents/${content_id}`),
      // Get all fields, and field inputs
      axios.get(`/api/fields`),
      axios.get(`/api/field_inputs`),
      axios.get(`/api/field_values`)
    ]).then((res) => {
      // Get all field values and filter to where contentId matches this.match.params.content_id
      let content = res[0].data
      let fields = res[1].data.filter((field) => field.objectId === content.objectId)
      let field_inputs = res[2].data
      let field_values = res[3].data

      this.setState({
        content: content,
        fields: fields.map((field) => {
          return {
            id: field.id,
            title: field.title,
            slug: field.slug,
            value: field_values.filter((fieldValue) => fieldValue.fieldId === field.id && fieldValue.contentId === content.id)[0],
            type: field_inputs.filter((fieldInput) => fieldInput.id === field.fieldInputId)[0]
          }
        })
      })
    })

  }

  // This also generates a slug based on the title
  handleTitleChange(e) {
    this.setState({
      content: { ...this.state.content, title: e.target.value, slug: e.target.value.replace(/\s+/g, '-').toLowerCase() },
    })
  }

  handleChangeFieldTitle(id, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === id) return { ...field, title: e.target.value }
      })
    })
  }

  handleChangeFieldValue(id, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === id) return { ...field, value: { ...field.value, value: e.target.value } }
        return field
      })
    })
  }

  handleDeleteField(id) {
    this.setState({
      fields: [...this.state.fields.filter((field) => field.id !== id)]
    })
  }

  updateContent() {
    // Update content title
    axios.put(`/api/contents/${this.state.content.id}`, {
      title: this.state.content.title
    })
      .then((res) => {
        return Promise.all(
          this.state.fields.map((field) => {
            return axios.put(`/api/field_values/${field.value.id}`, {
              value: field.value.value
            })
          })
        )
      })
      .then((res) => {
        this.props.history.push(`/objects/${this.state.content.objectId}/contents`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSave() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    this.updateContent()
  }

  render() {

    let fields = this.state.fields.map((field) => {
      return (
        <div key={field.id} class='col-6 mb-3'>
          <div class='form-group'>
            <label>{field.title}</label>
            <div class='input-group'>
              <input class='form-control' type={field.type} value={field.value.value} placeholder='' onChange={this.handleChangeFieldValue.bind(this, field.id)} />
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        <ContentSystemFields
          uiTitle={`Edit ${this.state.content.title}`}
          title={this.state.content.title}
          slug={this.state.content.slug}
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
export default withRouter(connect()(ContentEditForm))
