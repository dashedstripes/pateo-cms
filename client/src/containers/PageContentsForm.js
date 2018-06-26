import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PageContentsHeading from '../components/PageContentsHeading';
import FormEditField from '../components/FormEditField';

class PageContentsForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      page: {},
      fields: []
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    let pageId = parseInt(this.props.match.params.page_id)

    Promise.all([
      axios.get(`/api/pages/${pageId}`),
      axios.get(`/api/fields`),
      axios.get(`/api/field_inputs`),
      axios.get(`/api/field_values`)
    ]).then((res) => {
      let page = res[0].data
      let fields = res[1].data
      let fieldInputs = res[2].data
      let fieldValues = res[3].data

      this.setState({
        page,
        fields: fields.filter((field) => field.pageId === pageId).map((field) => {
          return {
            id: field.id,
            title: field.title,
            slug: field.slug,
            value: fieldValues.filter((fieldValue) => fieldValue.fieldId === field.id)[0],
            type: fieldInputs.filter((fieldInput) => fieldInput.id === field.fieldInputId)[0]
          }
        })
      })

    })
  }

  handleTitleChange() {

  }

  handleChangeFieldValue() {

  }

  handleSave() {

  }

  render() {

    let fields = this.state.fields.map((field) => {
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
        <PageContentsHeading
          title={this.state.page.title}
          onSave={this.handleSave}
        />
        <div class='row'>
          {fields}
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(PageContentsForm))
