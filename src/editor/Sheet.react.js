import React from 'react'
import PropTypes from 'prop-types'
import GridLayout from 'react-grid-layout'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FroalaEditor from 'react-froala-wysiwyg'
import filter from 'lodash/filter'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

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

export default function Sheet({ lock, interaction, format, orientation, layout, layoutChangeHandler }) {
  const width = calculatePageWidth(format, orientation)

  function handleCellDelete(data) {
    layoutChangeHandler(filter(layout, item => item.i !== data.i), false)
  }

  function handleContentChange(data, content) {
    layoutChangeHandler(layout.map(item => item.i === data.i ? { ...item, content } : item), false)
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
          onLayoutChange={layoutChangeHandler}
        >
          {layout && layout.map(item => createElement(item))}
        </GridLayout>
      </div>
    </div>
  )
}

Sheet.propTypes = {
  lock: PropTypes.bool,
  interaction: PropTypes.bool,
  format: PropTypes.oneOf([Format.A3, Format.A4, Format.A5, Format.LETTER, Format.LEGAL, '']),
  orientation: PropTypes.oneOf([Format.ORIENTATION_PORTRAIT, Format.ORIENTATION_LANDSCAPE, '']),
  layout: PropTypes.array,
  layoutChangeHandler: PropTypes.func
}
Sheet.defaultProps = {
  lock: false,
  interaction: false,
  format: Format.A4,
  orientation: Format.ORIENTATION_PORTRAIT
}
