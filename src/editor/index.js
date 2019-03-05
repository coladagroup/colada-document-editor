import React, { useReducer, useEffect, createContext } from 'react'
import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'

import Ribbon from './Ribbon.react'
import SubRibbon from './SubRibbon.react'
import Sheet from './Sheet.react'
import Toolbox from './Toolbox.react'
import Preview from './Preview.react'
import * as Format from '../constants/FormatConstants'

const stores = [IndexedDbStore, LocalStorageStore, SessionStorageStore]
const db = new ImmortalStorage(stores)

const initialState = {
  preview: false,
  lock: false,
  interaction: false,
  save: false,
  name: '',
  format: '',
  orientation: '',
  layout: null
}

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
    default:
      throw new Error()
  }
}

export const DocumentsEditorContext = createContext(initialState)

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchData() {
    const document = await db.get('document', JSON.stringify({
      name: '',
      format: Format.A4,
      orientation: Format.ORIENTATION_PORTRAIT,
      layout: null
    }))

    dispatch({ type: 'init', value: JSON.parse(document) })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="column-box index-container">
      <DocumentsEditorContext.Provider value={{ ...state, dispatch, fetchData }}>

        <Ribbon />

        <SubRibbon />

        <div className="sub-app-container">
          <div className="split-content-container">
            <div className="split-main-content p-0">
              <div className="h-100">

                <div className="editor-document-container column-box">

                  <div className="edit-view-header">Document</div>

                  <Sheet />
                </div>

                <Toolbox />
              </div>
            </div>
          </div>
        </div>

        <Preview />
      </DocumentsEditorContext.Provider>
    </div>
  )
}
