import React, { useContext } from 'react'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import filter from 'lodash/filter'
import GridLayout from 'react-grid-layout'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FroalaEditor from 'react-froala-wysiwyg'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DocumentsEditorContext } from './index'
import * as Format from '../constants/FormatConstants'
import { EDITOR_FEATURES, QUICKINSERT_BUTTONS, ALLOWED_STYLE_PROPS, KEY } from '../constants/EditorConstants'
import { calculatePageWidth } from '../utils/FormatUtils'

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

export default function Sheet() {
  const { lock, interaction, format, orientation, layout, dispatch } = useContext(DocumentsEditorContext)

  const width = calculatePageWidth(format, orientation)

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

  function handleCellDelete(data) {
    handleLayoutChange(filter(layout, item => item.i !== data.i), false)
  }

  function handleContentChange(data, content) {
    handleLayoutChange(layout.map(item => item.i === data.i ? { ...item, content } : item), false)
  }

  function createElement(data) {
    return lock ? (
      <div key={data.i} data-grid={data} className="relative">
        <FroalaEditor
          tag="textarea"
          config={FROALA_CONFIG}
          model={data.content || ''}
          onModelChange={model => handleContentChange(data, model)}
        />
        <IconButton classes={{ root: 'cell-delete-button' }} onClick={() => handleCellDelete(data)}>
          <CloseIcon />
        </IconButton>
      </div>
    ) : (
      <div key={data.i} data-grid={data}>
        <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
      </div>
    )
  }

  return (
    <div className={`${format} ${orientation === Format.ORIENTATION_LANDSCAPE ? orientation : ''}`}>
      <div id="documentSheet" className="sheet">
        <GridLayout
          className="layout"
          preventCollision
          width={width}
          layout={layout || []}
          cols={12}
          rowHeight={30}
          isDraggable={interaction}
          isResizable={interaction}
          compactType={null}
          onLayoutChange={handleLayoutChange}
        >
          {layout && layout.map(item => createElement(item))}
        </GridLayout>
      </div>
    </div>
  )
}
