import { combineReducers } from 'redux'

import filterReducer from './filterReducer'
import todosReducer from './todosReducer'

const reducers = combineReducers({
  filter: filterReducer,
  todos: todosReducer
})

export default reducers