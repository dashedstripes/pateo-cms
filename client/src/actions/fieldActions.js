import axios from 'axios'

export function fetchFields() {
  return {
    type: 'FETCH_FIELDS',
    payload: axios.get('/api/fields')
  }
}

export function updateFields(fieldPromises) {
  return {
    type: 'UPDATE_FIELDS',
    payload: Promise.all(fieldPromises)
  }
}