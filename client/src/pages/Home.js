import React, { Component } from 'react'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      objects: [],
      pages: []
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/objects'),
      fetch('/api/pages')
    ]).then((res) => {
      return Promise.all(res.map((r) => r.json()))
    }).then((res) => {
      let objects = res[0]
      let pages = res[1]

      this.setState({
        isLoading: false,
        objects,
        pages
      })
    })
  }

  render() {

    if (this.state.isLoading) {
      <div>
        <h1>Dashboard</h1>
      </div>
    }

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You have {this.state.objects.length} objects, and {this.state.pages.length} pages.</p>
      </div>
    )
  }
}

export default Home
