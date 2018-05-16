import React, { Component } from 'react'

import CardList from '../containers/CardList'

class Objects extends Component {
  render() {
    return (
      <div>
        <CardList
          title='Objects'
          type='object'
          plural='pages'
          itemsUrl='/api/objects'
          newUrl='/objects/new' />
      </div>
    )

  }
}

export default Objects
