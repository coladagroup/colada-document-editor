import React, { useContext, useState, useEffect, forwardRef } from 'react'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import { DocumentsEditorContext } from './context'

// fixes bug with jspdf html method
window.html2canvas = html2canvas

const SCALE_FACTOR = 2

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

function Preview() {
  const { preview, format, orientation, dispatch } = useContext(DocumentsEditorContext)

  const [output, setOutput] = useState('')

  useEffect(() => {
    if (format && orientation && preview) {
      const doc = new JsPDF(orientation, 'mm', format)
      doc.setProperties({ title: 'Document' })

      const input = document.querySelector('.react-grid-layout')
      const sheet = document.querySelector('.sheet')

      const canvasWidth = input.clientWidth * SCALE_FACTOR
      const canvasHeight = sheet.clientHeight * SCALE_FACTOR

      const originalHeight = input.style.height
      input.style.height = `${sheet.clientHeight}px`

      html2canvas(input, {
        scale: SCALE_FACTOR,
        width: canvasWidth,
        height: canvasHeight,
      }).then(canvas => {
        const width = doc.internal.pageSize.getWidth()
        const height = doc.internal.pageSize.getHeight()

        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, width, height)

        setOutput(doc.output('bloburi'))

        input.style.height = originalHeight
      })
    }
  }, [format, orientation, preview])

  function handleClose() {
    dispatch({ type: 'preview', value: !preview })
  }

  return (
    <Dialog
      fullScreen
      open={preview}
      onClose={handleClose}
      TransitionComponent={Transition}
    >

      <AppBar>
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <iframe
        className="preview-container"
        title="PDF Output"
        src={output}
      />
    </Dialog>
  )
}

export default Preview
