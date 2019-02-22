import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import * as Format from '../constants/FormatConstants'

export default function Settings({ open, format, orientation, closeHandler, saveHandler }) {
  const [stateFormat, setFormat] = useState(format)
  const [stateOrientation, setOrientation] = useState(orientation)
  const [save, setSave] = useState(false)

  useEffect(() => {
    setFormat(format)
    setOrientation(orientation)
  }, [format, orientation])

  function handleSave() {
    saveHandler({ format: stateFormat, orientation: stateOrientation })
    setSave(false)
  }

  function handleOrientationChange(e) {
    setOrientation(e.target.value)
    setSave(true)
  }

  function handleFormatChange(e) {
    setFormat(e.target.value)
    setSave(true)
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="settings-dialog-title"
      classes={{ paper: 'editor-settings-dialog' }}
      onClose={closeHandler}
    >
      <DialogTitle id="settings-dialog-title">Document Setup</DialogTitle>
      <DialogContent>
        <Grid container direction="column">

          <Grid item>
            <div className="edit-view-header">Paper</div>
          </Grid>

          <Grid item>
            <Grid container spacing={32}>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="format-select">Format</InputLabel>
                  <Select
                    value={stateFormat}
                    onChange={handleFormatChange}
                    inputProps={{ name: 'format', id: 'format-select' }}
                  >
                    <MenuItem value={Format.A4}>A4</MenuItem>
                    <MenuItem value={Format.A3}>A3</MenuItem>
                    <MenuItem value={Format.A5}>A5</MenuItem>
                    <MenuItem value={Format.LETTER}>Letter</MenuItem>
                    <MenuItem value={Format.LEGAL}>Legal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="orientation-select">Orientation</InputLabel>
                  <Select
                    value={stateOrientation}
                    onChange={handleOrientationChange}
                    inputProps={{ name: 'orientation', id: 'orientation-select' }}
                  >
                    <MenuItem value={Format.ORIENTATION_PORTRAIT}>Portrait</MenuItem>
                    <MenuItem value={Format.ORIENTATION_LANDSCAPE}>Landscape</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={closeHandler}
        >
          {'Cancel'}
        </Button>
        <Button
          autoFocus
          disabled={!save}
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Settings.propTypes = {
  open: PropTypes.bool,
  format: PropTypes.string,
  orientation: PropTypes.string,
  closeHandler: PropTypes.func,
  saveHandler: PropTypes.func
}
