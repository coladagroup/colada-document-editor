import React from 'react'
import PropTypes from 'prop-types'
import GridLayout from 'react-grid-layout'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import filter from 'lodash/filter'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import * as Format from '../constants/FormatConstants'
import { calculatePageWidth } from '../utils/FormatUtils'

export default function Sheet({ lock, format, orientation, layout, layoutChangeHandler, selectHandler }) {
  const width = calculatePageWidth(format, orientation)

  function cellDeleteHandler(data) {
    layoutChangeHandler(filter(layout, item => item.i !== data.i))
  }

  function createElement(data) {
    return lock ? (
      <div
        key={data.i}
        data-grid={data}
        className="relative"
        role="button"
        tabIndex={0}
        onClick={() => selectHandler(data)}
        onKeyPress={() => selectHandler(data)}
      >
        <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        <IconButton classes={{ root: 'cell-delete-button' }} onClick={() => cellDeleteHandler(data)}>
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
          isDraggable={lock}
          isResizable={lock}
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
  format: PropTypes.oneOf([Format.A3, Format.A4, Format.A5, Format.LETTER, Format.LEGAL]),
  orientation: PropTypes.oneOf([Format.ORIENTATION_PORTRAIT, Format.ORIENTATION_LANDSCAPE]),
  layout: PropTypes.array,
  layoutChangeHandler: PropTypes.func,
  selectHandler: PropTypes.func
}
Sheet.defaultProps = {
  lock: false,
  format: Format.A4,
  orientation: Format.ORIENTATION_PORTRAIT
}
