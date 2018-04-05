import React, { Component } from 'react'

class PagesContents extends Component {
  render() {
    return (
      <div>
        PagesContents for page_id: {this.props.match.params.page_id}
      </div>
    )
  }
}

export default PagesContents
