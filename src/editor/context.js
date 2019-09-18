import { createContext } from 'react'

export const initialState = {
  preview: false,
  lock: false,
  interaction: false,
  save: false,
  name: '',
  format: '',
  orientation: '',
  layout: null,
  selected: null
}

export const DocumentsEditorContext = createContext(initialState)
