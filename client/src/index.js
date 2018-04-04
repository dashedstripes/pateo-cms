import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'

import About from './pages/About'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Todo from './pages/Todo'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/about" component={About} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)