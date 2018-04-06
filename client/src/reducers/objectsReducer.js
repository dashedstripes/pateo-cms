const defaultState = {
  pending: false,
  error: {},
  objects: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_OBJECTS_PENDING':
      return { ...state, pending: true }
    case 'FETCH_OBJECTS_REJECTED':
      return { ...state, pending: false, error: action.payload }
    case 'FETCH_OBJECTS_FULFILLED':
      return { ...state, pending: false, objects: action.payload.data }
    default:
      return state
  }
}

export default reducer