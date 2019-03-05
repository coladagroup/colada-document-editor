import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { DocumentsEditorContext } from './index'
import * as Format from '../constants/FormatConstants'

export default function Toolbox() {
  const { lock, name, format, orientation, dispatch } = useContext(DocumentsEditorContext)

  function handleOrientationChange(e) {
    dispatch({ type: 'orientation', value: e.target.value })
  }

  function handleFormatChange(e) {
    dispatch({ type: 'format', value: e.target.value })
  }

  function handleNameChange(e) {
    dispatch({ type: 'name', value: e.target.value })
  }

  return (
    <div className="editor-toolbox-container">

      <div className="editor-toolbox-header">Template Settings</div>

      <Grid container direction="column" spacing={16}>

        <Grid item>
          <TextField
            required
            fullWidth
            disabled={!lock}
            value={name}
            label="Name"
            InputLabelProps={{ shrink: true }}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item>
          <FormControl fullWidth disabled={!lock}>
            <InputLabel htmlFor="format-select">Format</InputLabel>
            <Select
              value={format}
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

        <Grid item>
          <FormControl fullWidth disabled={!lock}>
            <InputLabel htmlFor="orientation-select">Orientation</InputLabel>
            <Select
              value={orientation}
              onChange={handleOrientationChange}
              inputProps={{ name: 'orientation', id: 'orientation-select' }}
            >
              <MenuItem value={Format.ORIENTATION_PORTRAIT}>Portrait</MenuItem>
              <MenuItem value={Format.ORIENTATION_LANDSCAPE}>Landscape</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}
