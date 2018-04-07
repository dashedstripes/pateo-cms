import { combineReducers } from 'redux'

import objectsReducer from './objectsReducer'
import pagesReducer from './pagesReducer'
import fieldInputsReducer from './fieldInputsReducer'
import fieldsReducer from './fieldsReducer'

const reducers = combineReducers({
  objects: objectsReducer,
  pages: pagesReducer,
  fieldInputs: fieldInputsReducer,
  fields: fieldsReducer
})

export default reducers