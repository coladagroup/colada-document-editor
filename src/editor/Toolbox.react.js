import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import * as Format from '../constants/FormatConstants'

export default function Toolbox({
  lock,
  name,
  format,
  orientation,
  nameChangeHandler,
  formatChangeHandler,
  orientationChangeHandler
}) {
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
            onChange={nameChangeHandler}
          />
        </Grid>

        <Grid item>
          <FormControl fullWidth disabled={!lock}>
            <InputLabel htmlFor="format-select">Format</InputLabel>
            <Select
              value={format}
              onChange={formatChangeHandler}
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
              onChange={orientationChangeHandler}
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

Toolbox.propTypes = {
  lock: PropTypes.bool.isRequired,
  name: PropTypes.string,
  format: PropTypes.string,
  orientation: PropTypes.string,
  nameChangeHandler: PropTypes.func.isRequired,
  formatChangeHandler: PropTypes.func.isRequired,
  orientationChangeHandler: PropTypes.func.isRequired
}
