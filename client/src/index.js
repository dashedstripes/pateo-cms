import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'

import Home from './pages/Home'
import Layout from './pages/Layout'

import Objects from './pages/Objects'
import NewObject from './pages/Objects/NewObject'
import EditObject from './pages/Objects/EditObject'

import Pages from './pages/Pages'
import NewPage from './pages/Pages/NewPage'
import EditPage from './pages/Pages/EditPage'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />

        <Route exact path="/objects" component={Objects} />
        <Route exact path="/objects/new" component={NewObject} />
        <Route exact path="/objects/:object_id/edit" component={EditObject} />

        <Route exact path="/pages" component={Pages} />
        <Route exact path="/pages/new" component={NewPage} />
        <Route exact path="/pages/:page_id/edit" component={EditPage} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)