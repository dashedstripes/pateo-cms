const defaultState = {
  pending: false,
  error: {},
  fieldInputs: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_FIELD_INPUTS_PENDING':
      return { ...state, pending: true }
    case 'FETCH_FIELD_INPUTS_REJECTED':
      return { ...state, pending: false, error: action.payload }
    case 'FETCH_FIELD_INPUTS_FULFILLED':
      return { ...state, pending: false, fieldInputs: action.payload.data }
    default:
      return state
  }
}

export default reducer