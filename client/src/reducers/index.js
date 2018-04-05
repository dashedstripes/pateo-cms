import { combineReducers } from 'redux'

import objectsReducer from './objectsReducer'
import pagesReducer from './pagesReducer'

const reducers = combineReducers({
  objects: objectsReducer,
  pages: pagesReducer
})

export default reducers