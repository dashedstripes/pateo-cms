import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'

import Home from './pages/Home'
import Layout from './pages/Layout'
import Objects from './pages/Objects'
import Pages from './pages/Pages'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/objects" component={Objects} />
        <Route exact path="/pages" component={Pages} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)