import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

// fixes bug with jspdf html method
window.html2canvas = html2canvas

function Transition(props) {
  return <Slide direction="up" {...props} />
}

export default function Preview({ open, format, orientation, closeHandler }) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (format && orientation && open) {
      const input = document.getElementById('documentSheet')

      const doc = new JsPDF(orientation, 'pt', format)
      doc.setProperties({ title: 'Document' })

      doc.html(input, { html2canvas: { scale: 0.75 } })
        .then(() => setOutput(doc.output('datauristring')))
    }
  }, [format, orientation, open])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closeHandler}
      TransitionComponent={Transition}
    >

      <AppBar>
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={closeHandler} aria-label="Close">
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

Preview.propTypes = {
  open: PropTypes.bool.isRequired,
  format: PropTypes.string,
  orientation: PropTypes.string,
  closeHandler: PropTypes.func.isRequired
}
