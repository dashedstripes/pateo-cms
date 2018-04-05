const defaultState = [
  {
    id: 1,
    title: 'Artwork',
    slug: 'artwork'
  },
  {
    id: 2,
    title: 'Property',
    slug: 'property'
  }
]

function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer