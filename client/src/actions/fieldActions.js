import axios from 'axios'

export function fetchFields() {
  return {
    type: 'FETCH_FIELDS',
    payload: axios.get('/api/fields')
  }
}