import React, { useReducer, useEffect, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import FroalaEditor from 'react-froala-wysiwyg'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import Ribbon from './Ribbon.react'
import SubRibbon from '../../docs/SubRibbon.react'
import Sheet from './Sheet.react'
import Preview from './Preview.react'
import Settings from './Settings.react'
import * as Format from '../constants/FormatConstants'
import { EDITOR_FEATURES, QUICKINSERT_BUTTONS, ALLOWED_STYLE_PROPS, KEY } from '../constants/EditorConstants'

const uuidv1 = require('uuid/v1')

const stores = [IndexedDbStore, LocalStorageStore, SessionStorageStore]
const db = new ImmortalStorage(stores)

const FROALA_CONFIG = {
  charCounterCount: false,
  toolbarButtons: [...EDITOR_FEATURES],
  quickInsertButtons: [...QUICKINSERT_BUTTONS],
  linkAutoPrefix: '',
  htmlRemoveTags: [],
  htmlAllowedStyleProps: ALLOWED_STYLE_PROPS,
  htmlUntouched: true,
  toolbarInline: true,
  key: KEY
}

const initialState = {
  preview: false,
  lock: false,
  save: false,
  settings: false,
  name: '',
  format: Format.A4,
  orientation: Format.ORIENTATION_PORTRAIT,
  layout: null,
  selectedCell: null,
  content: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'preview':
      return { ...state, preview: action.value }
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
    case 'selectedCell':
      return { ...state, selectedCell: action.value, content: action.value ? action.value.content : '' }
    case 'content':
      return { ...state, content: action.value }
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

  const { preview, lock, save, settings, name, format, orientation, layout, selectedCell, content } = state

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

  function applyContentHandler() {
    const newCell = { ...selectedCell, content }

    dispatch({ type: 'layout', value: layout.map(item => item.i === selectedCell.i ? newCell : item) })
    dispatch({ type: 'selectedCell', value: newCell })
  }

  function discardHandler() {
    dispatch({ type: 'content', value: selectedCell.content })
  }

  function handleContentChange(value) {
    dispatch({ type: 'content', value })
  }

  function handleNameChange(e) {
    dispatch({ type: 'name', value: e.target.value })
  }

  function handleCellSelect(value) {
    dispatch({ type: 'selectedCell', value })
  }

  function handleLayoutChange(newLayout) {
    if (layout && !isEqual(layout, newLayout)) {
      dispatch({
        type: 'layout',
        value: newLayout.map((item) => {
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

  function handleSettings() {
    dispatch({ type: 'settings', value: true })
  }

  async function handleSave() {
    await db.set('document', JSON.stringify({ name, format, orientation, layout }))

    dispatch({ type: 'save', value: false })
  }

  function addCellHandler() {
    dispatch({ type: 'layout', value: [...layout, { i: uuidv1(), x: 0, y: 0, w: 2, h: 2 }] })
  }

  function handleLock(value) {
    dispatch({ type: 'lock', value })

    if (!value) {
      fetchData()

      dispatch({ type: 'selectedCell', value: null })
    }
  }

  function handlePreview() {
    window.html2canvas = html2canvas

    const input = document.getElementById('documentSheet')

    const doc = new JsPDF(orientation, 'pt', format)
    doc.html(input).then(() => doc.save('document.pdf'))

    // dispatch({ type: 'preview', value: !preview })
  }

  return (
    <div className="column-box index-container">

      <Ribbon />

      <SubRibbon
        preview={preview}
        lock={lock}
        save={save}
        previewHandler={handlePreview}
        lockHandler={handleLock}
        addHandler={addCellHandler}
        saveHandler={handleSave}
        settingsHandler={handleSettings}
      />

      <div className="sub-app-container">
        <div className="split-content-container">
          <div className="split-main-content p-0">
            <div className="h-100">

              {preview ? (
                <Preview
                  format={format}
                  orientation={orientation}
                  layout={layout}
                />
              ) : (
                <Fragment>
                  <div className="editor-document-container column-box">

                    <div className="edit-view-header">Document</div>

                    <Sheet
                      lock={lock}
                      format={format}
                      orientation={orientation}
                      layout={layout}
                      layoutChangeHandler={handleLayoutChange}
                      selectHandler={handleCellSelect}
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

                    {selectedCell && (
                      <div className="m-t-20">

                        <div className="editor-toolbox-content-label">Content</div>

                        <FroalaEditor
                          tag="textarea"
                          config={FROALA_CONFIG}
                          model={content || ''}
                          onModelChange={handleContentChange}
                        />

                        <div className="m-t-10 flex-end-box align-center-box">

                          <Button
                            color="primary"
                            onClick={discardHandler}
                          >
                            {'Discard'}
                          </Button>

                          <Button
                            disabled={selectedCell.content === content}
                            color="primary"
                            variant="contained"
                            onClick={applyContentHandler}
                          >
                            {'Apply'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Fragment>
              )}
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
