import React, { Component } from 'react'

import TableList from '../containers/TableList'

class Objects extends Component {
  render() {
    return (
      <div>
        <TableList
          title='Objects'
          type='object'
          plural='objects'
          itemsUrl='/api/objects'
          newUrl='/objects/new' />
      </div>
    )

  }
}

export default Objects
