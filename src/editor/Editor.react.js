import React, { useReducer, useEffect } from 'react'

import db from '../shared/storage'
import Ribbon from './Ribbon.react'
import SubRibbon from './SubRibbon.react'
import Sheet from './Sheet.react'
import Toolbox from './Toolbox.react'
import Preview from './Preview.react'
import * as Format from '../constants/FormatConstants'
import { initialState, DocumentsEditorContext } from './context'
import reducer from './reducer'

function Editor() {
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

export default Editor
