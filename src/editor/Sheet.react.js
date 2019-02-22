import React from 'react'
import PropTypes from 'prop-types'
import RGL, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import * as Format from '../constants/FormatConstants'

const GridLayout = WidthProvider(RGL)

export default function Sheet({ lock, format, orientation, layout, layoutChangeHandler }) {
  return (
    <div className={`${format} ${orientation === Format.ORIENTATION_LANDSCAPE ? orientation : ''}`}>
      <div className="sheet">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          isDraggable={lock}
          isResizable={lock}
          verticalCompact={false}
          onLayoutChange={layoutChangeHandler}
        >
          <div key="a">CELL 1</div>
          <div key="b">CELL 2</div>
          <div key="c">CELL 3</div>
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
  layoutChangeHandler: PropTypes.func
}
Sheet.defaultProps = {
  lock: false,
  format: Format.A4,
  orientation: Format.ORIENTATION_PORTRAIT
}
