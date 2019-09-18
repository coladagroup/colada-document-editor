function reducer(state, action) {
  switch (action.type) {
    case 'preview':
      return { ...state, preview: action.value }
    case 'lock':
      return { ...state, lock: action.value }
    case 'interaction':
      return { ...state, interaction: action.value }
    case 'save':
      return { ...state, save: action.value }
    case 'name':
      return { ...state, name: action.value, save: true }
    case 'format':
      return { ...state, format: action.value, save: true }
    case 'orientation':
      return { ...state, orientation: action.value, save: true }
    case 'layout':
      return { ...state, layout: action.value, save: true }
    case 'init':
      return { ...state, ...action.value }
    case 'select':
      return { ...state, selected: action.value }
    default:
      throw new Error()
  }
}

export default reducer
