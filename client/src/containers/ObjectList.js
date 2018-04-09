import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchObjects } from '../actions/objectActions'

import ObjectListItem from '../components/ObjectListItem'

class ObjectList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchObjects())
  }

  render() {

    let objects = this.props.objects.map((object) =>
      <ObjectListItem key={object.id} id={object.id} title={object.title} />)

    if (this.props.error.message) {
      return (
        <div>
          <p>{this.props.error.message}</p>
        </div>
      )
    }

    return (
      <div>
        <h1>Objects</h1>
        <Link to='/objects/new'>New Object</Link>
        {objects}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    pending: state.objects.pending,
    error: state.objects.error,
    objects: state.objects.objects
  }
}

export default connect(mapStateToProps)(ObjectList)
