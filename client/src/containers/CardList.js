import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '../components/Card';

class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      hasError: false,
      items: []
    }
  }

  componentDidMount() {
    // Set State to loading
    this.setState({
      isLoading: true
    })

    // Get all items and set component state
    axios.get(this.props.itemsUrl)
      .then((res) => {
        this.setState({
          items: res.data,
          isLoading: false
        })
      })
      // TODO: Better error handling
      .catch((err) => {
        this.setState({
          hasError: true,
          isLoading: false
        })
      })
  }

  handleDelete(id) {
    // TODO: Make the user accept a confirmation dialog or something before deleting

    // Delete the item via the API
    axios.delete(this.props.itemsUrl + '/' + id)
      .then((res) => console.log(res))
      // TODO: Better error handling
      .catch((error) => {
        this.setState({
          hasError: true
        })
      })

    // Optimistically delete the item
    this.setState({
      items: this.state.items.filter((item) => item.id !== id)
    })
  }

  render() {
    let items = this.state.items.map((item) => (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.title}</td>
        <td>{item.slug}</td>
        <td>
          <Link class='btn btn-link' to={`/${this.props.plural}/${item.id}/edit`}>
            <i class="far fa-edit"></i>
          </Link>
          <button class='btn btn-link' onClick={this.handleDelete.bind(this, item.id)}>
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    ))

    let isLoading = this.state.isLoading ? <p><i class="fas fa-spinner"></i></p> : null

    return (
      <div>

        {this.state.hasError
          ?
          <div class='alert alert-danger'>
            An error occured whilst fetching {this.props.title}, please refresh the page to try again.
          </div>
          : null}

        <div class='row pb-4'>
          <div class='col-6'>
            <h3>{this.props.title}</h3>
          </div>
          <div class='col-6'>
            <Link class='btn btn-primary float-right' to={this.props.newUrl}>New {this.props.type}</Link>
          </div>
        </div>
        <div class='row'>

          {isLoading}

          {this.state.items.length > 0
            ?
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
            :
            <div class='col-12'>
              <p>No {this.props.plural} found.</p>
            </div>
          }
        </div>
      </div>
    )

  }
}

export default CardList
