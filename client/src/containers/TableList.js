import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchObjects } from '../actions/objectActions';
import { fetchPages } from '../actions/pageActions';
import Table from '../components/Table';
import TableRow from '../components/TableRow';

class TableList extends Component {
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
    let items = this.state.items.map((item) => (
      <TableRow
        key={item.id}
        id={item.id}
        title={item.title}
        slug={item.slug}
        editUrl={`/${this.props.plural}/${item.id}/edit`}
        onDelete={this.handleDelete.bind(this, item.id)}
      />
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
            <Table
              headings={['ID', 'Name', 'Slug', 'Actions']}
              items={items}
            />
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

export default withRouter(connect()(TableList))
