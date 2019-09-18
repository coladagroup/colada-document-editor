import React, { useContext } from 'react'
import find from 'lodash/find'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DocumentsEditorContext } from './context'
import * as Format from '../constants/FormatConstants'
import RichTextEditor from '../components/RichTextEditor'

const ResponsiveGridLayout = WidthProvider(Responsive)

function Sheet() {
  const { lock, interaction, format, orientation, layout, selected, dispatch } = useContext(DocumentsEditorContext)

  function handleLayoutChange(newLayout, layouts, revertContent = true) {
    if (layout && layouts) {
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

  function handleContentChange(data, content) {
    handleLayoutChange(layout.map(item => item.i === data.i ? { ...item, content } : item), [], false)
  }

  function handleSelect(uid) {
    return function select() {
      dispatch({ type: 'select', value: uid })
    }
  }

  function createElement(data, selectedTile) {
    return (
      <div
        key={data.i}
        data-grid={data}
        tabIndex={0}
        role="button"
        className={`relative
        ${lock ? 'tile-container' : ''}
        ${lock && selectedTile ? 'tile-container__selected' : ''}
        ${!lock ? 'tile-read-only-container' : ''}`}
        onClick={handleSelect(data.i)}
        onKeyPress={handleSelect(data.i)}
      >
        <RichTextEditor
          text={data.content}
          disabled={!lock || interaction}
          config={{
            toolbarInline: true,
            zIndex: 2501,
          }}
          onModelChange={model => handleContentChange(data, model)}
        />
      </div>
    )
  }

  return (
    <div className={`${format} ${orientation === Format.ORIENTATION_LANDSCAPE ? orientation : ''}`}>
      <div id="documentSheet" className="sheet">
        <ResponsiveGridLayout
          preventCollision
          rowHeight={30}
          isDraggable={lock && interaction}
          isResizable={lock && interaction}
          compactType={null}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          onLayoutChange={handleLayoutChange}
        >
          {layout && layout.map(item => createElement(item, item.i === selected))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}

export default Sheet
