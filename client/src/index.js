import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'

import Home from './pages/Home'
import Layout from './pages/Layout'
import Objects from './pages/Objects'

import Pages from './pages/Pages'
import NewPage from './pages/Pages/NewPage'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />

        <Route exact path="/objects" component={Objects} />

        <Route exact path="/pages" component={Pages} />
        <Route exact path="/pages/new" component={NewPage} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)