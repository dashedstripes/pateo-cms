import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const defaultState = {
  objects: [
    {
      id: 1,
      title: 'Artwork'
    },
    {
      id: 2,
      title: 'Property'
    }
  ]
}

class ObjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objects: []
    }
  }

  handleDelete(id) {
    this.setState({
      objects: this.state.objects.filter((object) => object.id !== id)
    })
  }

  render() {
    let objects = this.state.objects.map((object) => (
      <div key={object.id} class='col-4 py-3'>
        <div class='card'>
          <div class='card-body'>
            <h5 class='card-title'>{object.title}</h5>
            <div class='btn-group'>
              <Link class='btn btn-link' to={'/objects/' + object.id + '/edit'}>
                <i class="far fa-edit"></i>
              </Link>
              <button class='btn btn-link' onClick={this.handleDelete.bind(this, object.id)}>
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))

    return (
      <div>
        <div class='row py-4'>
          <div class='col-6'>
            <h3>Objects</h3>
          </div>
          <div class='col-6'>
            <Link class='btn btn-primary float-right' to='/objects/new'>New Object</Link>
          </div>
        </div>
        <div class='row'>
          {this.state.objects.length > 0
            ? objects
            :
            <div class='col-12'>
              <p>No Objects found.</p>
            </div>
          }
        </div>
      </div>
    )

  }
}

export default ObjectList
