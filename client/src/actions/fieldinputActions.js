import axios from 'axios'

export function fetchFieldInputs() {
  return {
    type: 'FETCH_FIELD_INPUTS',
    payload: axios.get('/api/field_inputs')
  }
}