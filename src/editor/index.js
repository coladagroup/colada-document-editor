import React, { useReducer, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'

import Ribbon from './Ribbon.react'
import SubRibbon from './SubRibbon.react'
import Sheet from './Sheet.react'
import Settings from './Settings.react'
import * as Format from '../constants/FormatConstants'

const stores = [IndexedDbStore, LocalStorageStore, SessionStorageStore]
const db = new ImmortalStorage(stores)

const initialState = {
  lock: false,
  save: false,
  settings: false,
  name: '',
  format: Format.A4,
  orientation: Format.ORIENTATION_PORTRAIT,
  layout: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case 'lock':
      return { ...state, lock: action.value }
    case 'save':
      return { ...state, save: action.value }
    case 'settings':
      return { ...state, settings: action.value }
    case 'name':
      return { ...state, name: action.value, save: true }
    case 'layout':
      return { ...state, layout: action.value, save: true }
    case 'init':
      return { ...state, ...action.value, settings: false }
    default:
      throw new Error()
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchData() {
    const document = await db.get('document', JSON.stringify({
      name: initialState.name,
      format: initialState.format,
      orientation: initialState.orientation,
      layout: initialState.layout
    }))

    dispatch({ type: 'init', value: JSON.parse(document) })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const { lock, save, settings, name, format, orientation, layout } = state

  async function handleSettingsSave(value) {
    await db.set('document', JSON.stringify({
      name,
      layout,
      format: value.format,
      orientation: value.orientation
    }))

    dispatch({ type: 'init', value })
  }

  function handleSettingsClose() {
    dispatch({ type: 'settings', value: false })
  }

  function handleNameChange(e) {
    dispatch({ type: 'name', value: e.target.value })
  }

  function handleLayoutChange(value) {
    dispatch({ type: 'layout', value })
  }

  function handleSettings() {
    dispatch({ type: 'settings', value: true })
  }

  async function handleSave() {
    await db.set('document', JSON.stringify({ name, format, orientation, layout }))

    dispatch({ type: 'save', value: false })
  }

  function handleLock(value) {
    dispatch({ type: 'lock', value })
  }

  return (
    <div className="column-box index-container">

      <Ribbon />

      <SubRibbon
        lock={lock}
        save={save}
        lockHandler={handleLock}
        saveHandler={handleSave}
        settingsHandler={handleSettings}
      />

      <div className="sub-app-container">
        <div className="split-content-container">
          <div className="split-main-content p-0">
            <div className="h-100">

              <div className="editor-document-container column-box">

                <div className="edit-view-header">Document</div>

                <Sheet
                  lock={lock}
                  format={format}
                  orientation={orientation}
                  layout={layout}
                  layoutChangeHandler={handleLayoutChange}
                />
              </div>

              <div className="editor-toolbox-container">

                <div className="editor-toolbox-header">Template Settings</div>

                <TextField
                  required
                  fullWidth
                  disabled={!lock}
                  value={name}
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Settings
        open={settings}
        format={format}
        orientation={orientation}
        closeHandler={handleSettingsClose}
        saveHandler={handleSettingsSave}
      />
    </div>
  )
}
