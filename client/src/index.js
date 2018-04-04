import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'

import Home from './pages/Home'
import Layout from './pages/Layout'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)