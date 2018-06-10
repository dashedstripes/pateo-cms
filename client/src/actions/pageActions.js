import axios from 'axios'

export function fetchPages() {
  return {
    type: 'FETCH_PAGES',
    payload: axios.get('/api/pages')
  }
}