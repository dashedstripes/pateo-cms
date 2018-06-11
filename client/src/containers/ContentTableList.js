// This is a modification of TableList, there is enough difference
// between the two components to warrant a new component just for contents

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import Table from '../components/Table';
import TableRow from '../components/TableRow';

class ContentTableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      hasError: false,
      objects: [],
      items: [],
      currentObject: [],
      currentItems: []
    }
  }

  // First we fetch all objects, and all contents when the 
  // components first mounts
  componentDidMount() {
    let objects = []

    // Set State to loading
    this.setState({
      isLoading: true
    })

    axios.get(`/api/objects`)
      .then((res) => {
        objects = res.data
        // Get all items and set component state
        return axios.get(`/api/contents`)
      })
      .then((res) => {
        let items = res.data
        this.setState({
          objects: objects,
          items: items,
          currentObject: this.getCurrentObject(objects, this.props),
          currentItems: this.getCurrentItems(items, this.props),
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

  // Whenever the component recieves new props
  // (when the route changes), we then filter the objects and items that
  // we fetched at the component mounting
  componentWillReceiveProps(props) {
    this.setState({
      currentObject: this.getCurrentObject(this.state.objects, props),
      currentItems: this.getCurrentItems(this.state.items, props)
    })
  }

  getCurrentObject(objects, props) {
    return objects.filter((object) => object.id === parseInt(props.match.params.object_id) ? object : null)[0]
  }

  getCurrentItems(items, props) {
    return items.filter((item) => item.objectId === parseInt(props.match.params.object_id) ? item : null)
  }

  handleDelete(id) {
    // TODO: Make the user accept a confirmation dialog or something before deleting

    // Delete the item via the API
    axios.delete(`/api/contents/${id}`)
      .then((res) => {
        this.props.dispatch(fetchObjects())
        this.props.dispatch(fetchPages())
      })
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
    let items = this.state.currentItems.map((item) => (
      <TableRow
        key={item.id}
        id={item.id}
        title={item.title}
        slug={item.slug}
        editUrl={`/contents/${item.id}/edit`}
        onDelete={this.handleDelete.bind(this, item.id)}
      />
    ))


    return (
      <div>

        {this.state.hasError
          ?
          <div class='alert alert-danger'>
            An error occured whilst fetching {this.state.currentObject.title}, please refresh the page to try again.
          </div>
          : null}

        <div class='row pb-4'>
          <div class='col-6'>
            <h3>{this.state.currentObject.title}</h3>
          </div>
          <div class='col-6'>
            <Link class='btn btn-primary float-right' to='/objects/2/contents/new'>New {this.state.currentObject.title}</Link>
          </div>
        </div>
        {this.state.isLoading ? null :
          <div class='row'>

            {this.state.items.length > 0
              ?
              <Table
                headings={['ID', 'Name', 'Slug', 'Actions']}
                items={items}
              />
              :
              <div class='col-12'>
                <p>No {this.state.currentObject.title} found.</p>
              </div>
            }
          </div>
        }
      </div>
    )

  }
}

export default withRouter(connect()(ContentTableList))
