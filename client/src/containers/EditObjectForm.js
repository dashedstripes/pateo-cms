import React, { Component } from 'react'

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

  render() {
    let fields = this.state.fields.map((field) => {
      let fieldInputs = this.state.fieldInputs.map((fieldInput) => {
        return <option key={fieldInput.id} value={fieldInput.id}>{fieldInput.title}</option>
      })

      return (
        <div key={field.id}>
          <p>{field.title}</p>
          <select value={field.fieldInputId} onChange={this.handleSelectChange.bind(this, field.id)}>
            {fieldInputs}
          </select>
        </div>
      )
    })

    return (
      <div>
        <h1>Edit {this.state.object.title} Object</h1>
        <button class='button'>Update Object</button>
        {fields}
      </div>
    )
  }
}

export default EditObjectForm
