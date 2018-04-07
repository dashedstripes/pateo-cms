const defaultState = {
  pending: false,
  error: {},
  fields: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_FIELDS_PENDING':
      return { ...state, pending: true }
    case 'FETCH_FIELDS_REJECTED':
      return { ...state, pending: false, error: action.payload }
    case 'FETCH_FIELDS_FULFILLED':
      return { ...state, pending: false, fields: action.payload.data }
    default:
      return state
  }
}

export default reducer