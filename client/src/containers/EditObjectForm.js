import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'

import FlashMessage from '../components/FlashMessage'
import EditObjectFormTitle from '../components/EditObjectForm/EditObjectFormTitle'

import { fetchObjects } from '../actions/objectActions'
import { fetchFieldInputs } from '../actions/fieldinputActions'
import { fetchFields, updateFields, deleteField } from '../actions/fieldActions'

class EditObjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      object: {},
      fields: [],
      fieldInputs: [],
      flash: {
        active: false,
        type: 'update',
        message: 'Object updated.'
      }
    }
  }

  componentDidMount() {
    this.load()
  }

  load() {
    this.props.dispatch(fetchObjects())
      .then(() => this.setCurrentObjectToState(this.props.objects.objects))
      .then(() => this.props.dispatch((fetchFields())))
      .then(() => this.setFieldsFromObjectIdToState(this.props.fields.fields))

    this.props.dispatch(fetchFieldInputs())
      .then(() => this.setState({ fieldInputs: this.props.fieldInputs.fieldInputs }))
  }

  setCurrentObjectToState(objects) {
    objects.forEach((object) => {
      if (object.id == this.props.object_id) {
        this.setState({
          object: object
        })
      }
    })
  }

  setFieldsFromObjectIdToState(fields) {
    this.setState({
      fields: fields.filter((field) => {
        if (field.objectId == this.props.object_id) {
          return field
        }
      })
    })
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

  handleInputChange(fieldId, e) {
    this.setState({
      fields: this.state.fields.map((field) => {
        if (field.id === fieldId) {
          field.title = e.target.value
        }
        return field
      })
    })
  }

  handleNewField(e) {
    this.setState({
      fields: this.state.fields.concat({
        id: Date.now(),
        title: 'Untitled Field',
        slug: 'untitled-field',
        fieldInputId: 1,
        newField: true
      })
    })
  }

  handleDeleteField(fieldId, e) {
    this.setState({
      fields: this.state.fields.filter((field) => {
        if (field.id !== fieldId) {
          return field
        }
      })
    })

    this.props.dispatch(deleteField(fieldId))
  }

  handleUpdate() {
    let fieldPromises = this.state.fields.map((field) => {
      if (field.newField) {
        return axios.post(`/api/fields`, {
          title: field.title,
          fieldInputId: field.fieldInputId,
          objectId: this.state.object.id
        })
      } else {
        return axios.put(`/api/fields/${field.id}`, field)
      }
    })

    this.setFlashMessage('update', 'Object updated.')

    this.props.dispatch(updateFields(fieldPromises)).then(() => this.load())
  }

  setFlashMessage(type, message) {
    this.setState({
      flash: {
        active: true,
        type,
        message
      }
    })

    setTimeout(() => {
      this.setState({
        flash: {
          active: false,
          type,
          message
        }
      })
    }, 2000)
  }

  render() {
    let fields = this.state.fields.map((field) => {
      let fieldInputs = this.state.fieldInputs.map((fieldInput) => {
        return <option key={fieldInput.id} value={fieldInput.id}>{fieldInput.title}</option>
      })

      return (
        <div key={field.id} class='col-6 p-tb-1'>
          <input type='text' value={field.title} onChange={this.handleInputChange.bind(this, field.id)} />
          <select value={field.fieldInputId} onChange={this.handleSelectChange.bind(this, field.id)}>
            {fieldInputs}
          </select>
          <button class='ion-ios-trash' onClick={this.handleDeleteField.bind(this, field.id)}></button>
        </div>
      )
    })

    if (this.props.objects.error.message) {
      return <p>{this.props.objects.error.message}</p>
    }

    if (this.props.fields.error.message) {
      return <p>{this.props.fields.error.message}</p>
    }

    return (
      <div>
        <FlashMessage active={this.state.flash.active} type={this.state.flash.type} message={this.state.flash.message} />
        <EditObjectFormTitle
          title={this.state.object.title}
          handleAddField={this.handleNewField.bind(this)}
          handleUpdate={this.handleUpdate.bind(this)} />
        <div class='row p-0 p-tb-1'>
          {fields}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    objects: state.objects,
    fieldInputs: state.fieldInputs,
    fields: state.fields
  }
}

export default connect(mapStateToProps)(EditObjectForm)
