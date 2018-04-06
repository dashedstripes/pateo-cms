import axios from 'axios'

export function fetchObjects() {
  return {
    type: 'FETCH_OBJECTS',
    payload: axios.get('/api/objects')
  }
}