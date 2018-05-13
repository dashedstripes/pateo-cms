import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ObjectCard from '../../components/ObjectCard';

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
      isLoading: false,
      hasError: false,
      objects: []
    }
  }

  componentDidMount() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    // Get all objects and set component state
    axios.get('/api/objects')
      .then((res) => {
        this.setState({
          objects: res.data,
          isLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          hasError: true,
          isLoading: false
        })
      })
  }

  handleDelete(id) {
    // Delete the object via the API
    axios.delete('/api/objects/' + id)
      .then((res) => console.log(res))
      .catch((error) => {
        this.setState({
          hasError: true
        })
      })

    // Optimistically delete the object
    this.setState({
      objects: this.state.objects.filter((object) => object.id !== id)
    })
  }

  render() {
    let objects = this.state.objects.map((object) => (
      <div key={object.id} class='col-4 py-3'>
        <ObjectCard
          id={object.id}
          title={object.title}
          onDelete={this.handleDelete.bind(this, object.id)} />
      </div>
    ))

    let isLoading = this.state.isLoading ? <p><i class="fas fa-spinner"></i></p> : null

    return (
      <div>

        {this.state.hasError
          ?
          <div class='alert alert-danger'>
            An error occured whilst fetching objects, please refresh the page to try again.
          </div>
          : null}

        <div class='row py-4'>
          <div class='col-6'>
            <h3>Objects</h3>
          </div>
          <div class='col-6'>
            <Link class='btn btn-primary float-right' to='/objects/new'>New Object</Link>
          </div>
        </div>
        <div class='row'>

          {isLoading}

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
