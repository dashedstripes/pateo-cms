import { combineReducers } from 'redux'

import objectsReducer from './objectsReducer'
import pagesReducer from './pagesReducer'
import fieldInputsReducer from './fieldInputsReducer'

const reducers = combineReducers({
  objects: objectsReducer,
  pages: pagesReducer,
  fieldInputs: fieldInputsReducer
})

export default reducers