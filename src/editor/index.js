import React, { useReducer, useEffect } from 'react'
import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'

import Ribbon from './Ribbon.react'
import SubRibbon from './SubRibbon.react'
import Sheet from './Sheet.react'
import Toolbox from './Toolbox.react'
import Preview from './Preview.react'
import * as Format from '../constants/FormatConstants'

const uuidv1 = require('uuid/v1')

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

  const { preview, lock, interaction, save, name, format, orientation, layout } = state

  function handleOrientationChange(e) {
    dispatch({ type: 'orientation', value: e.target.value })
  }

  function handleFormatChange(e) {
    dispatch({ type: 'format', value: e.target.value })
  }

  function handleNameChange(e) {
    dispatch({ type: 'name', value: e.target.value })
  }

  function handleLayoutChange(newLayout, revertContent = true) {
    if (layout && !isEqual(layout, newLayout)) {
      dispatch({
        type: 'layout',
        value: !revertContent ? newLayout : newLayout.map((item) => {
          let result = item

          const prevItem = find(layout, data => data.i === item.i)

          if (prevItem) {
            result = { ...item, content: prevItem.content }
          }

          return result
        })
      })
    }
  }

  async function handleSave() {
    await db.set('document', JSON.stringify({ name, format, orientation, layout }))

    dispatch({ type: 'save', value: false })
  }

  function addCellHandler() {
    dispatch({ type: 'layout', value: [...layout, { i: uuidv1(), x: 0, y: 0, w: 2, h: 2 }] })
  }

  function handleInteraction() {
    dispatch({ type: 'interaction', value: !interaction })
  }

  function handleLock(value) {
    dispatch({ type: 'lock', value })

    if (!value) {
      fetchData()

      dispatch({ type: 'interaction', value: false })
    }
  }

  function handlePreview() {
    dispatch({ type: 'preview', value: !preview })
  }

  return (
    <div className="column-box index-container">

      <Ribbon />

      <SubRibbon
        lock={lock}
        interaction={interaction}
        save={save}
        previewHandler={handlePreview}
        lockHandler={handleLock}
        interactionHandler={handleInteraction}
        addHandler={addCellHandler}
        saveHandler={handleSave}
      />

      <div className="sub-app-container">
        <div className="split-content-container">
          <div className="split-main-content p-0">
            <div className="h-100">

              <div className="editor-document-container column-box">

                <div className="edit-view-header">Document</div>

                <Sheet
                  lock={lock}
                  interaction={interaction}
                  format={format}
                  orientation={orientation}
                  layout={layout}
                  layoutChangeHandler={handleLayoutChange}
                />
              </div>

              <Toolbox
                lock={lock}
                name={name}
                format={format}
                orientation={orientation}
                nameChangeHandler={handleNameChange}
                formatChangeHandler={handleFormatChange}
                orientationChangeHandler={handleOrientationChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Preview
        open={preview}
        format={format}
        orientation={orientation}
        closeHandler={handlePreview}
      />
    </div>
  )
}
