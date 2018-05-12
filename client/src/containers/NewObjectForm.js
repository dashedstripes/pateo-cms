import React, { Component } from 'react'

class NewObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

    this.handleAddField = this.handleAddField.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
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

  render() {
    let fields = this.state.fields.map((field) => {
      return (
        <div key={field.id} class='col-6 m-b-1'>
          <input type='text' value={field.title} onChange={this.handleChangeFieldTitle.bind(this, field.id)} />
          <select value={field.type} onChange={this.handleChangeFieldType.bind(this, field.id)}>
            {this.state.fieldInputs.map((fieldInput) => {
              return <option key={fieldInput.id} value={fieldInput.type}>{fieldInput.title}</option>
            })}
          </select>
          <button onClick={this.handleDeleteField.bind(this, field.id)}>Delete field</button>
        </div>
      )
    })

    return (
      <div>
        <div class='row m-b-05'>
          <div class='col-6'>
            <h3>New Object</h3>
          </div>
          <div class='col-6'>
            <button>Save</button>
          </div>
        </div>
        <div class='row m-b-2'>
          <div class='col-12'>
            <input type='text' value={this.state.title} onChange={this.handleTitleChange} />
            <input type='text' value={this.state.slug} disabled />
          </div>
        </div>
        <div class='row'>
          {fields}
        </div>
        <div class='row'>
          <div class='col-12'>
            <button onClick={this.handleAddField}>Add Field</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewObjectForm
