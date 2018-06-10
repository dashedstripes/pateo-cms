const defaultState = {
  pending: false,
  error: {},
  pages: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_PAGES_PENDING':
      return { ...state, pending: true }
    case 'FETCH_PAGES_REJECTED':
      return { ...state, pending: false, error: action.payload }
    case 'FETCH_PAGES_FULFILLED':
      return { ...state, pending: false, pages: action.payload.data }
    default:
      return state
  }
}

export default reducer