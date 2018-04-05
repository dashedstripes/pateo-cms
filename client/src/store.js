import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import reducers from './reducers'

const middleware = applyMiddleware(promise())
const store = createStore(reducers, middleware)

console.log(store.getState())

store.subscribe(() => {
  console.log(store.getState())
})

export default store