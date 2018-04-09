import React, { Component } from 'react'

class FlashMessage extends Component {
  render() {
    return (
      <div class={'flash ' + (this.props.type) + (this.props.active ? ' active' : '')}>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default FlashMessage
