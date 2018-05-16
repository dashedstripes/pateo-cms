import React, { Component } from 'react'
import CardList from '../containers/CardList'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Pages extends Component {
  render() {
    return (
      <div>
        <div>
          <CardList
            title='Pages'
            type='page'
            plural='pages'
            itemsUrl='/api/pages'
            newUrl='/pages/new' />
        </div>
      </div>
    )

  }
}
export default Pages
