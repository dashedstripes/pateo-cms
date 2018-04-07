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

export function deleteField(fieldId) {
  return {
    type: 'DELETE_FIELD',
    payload: axios.delete(`/api/fields/${fieldId}`)
  }
}