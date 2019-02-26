import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import PreviewIcon from '@material-ui/icons/Visibility'
import SettingsIcon from '@material-ui/icons/Settings'

import BackIcon from '-!react-svg-loader!../svg/Back.svg'
import EditIcon from '-!react-svg-loader!../svg/Edit.svg'
import ExitIcon from '-!react-svg-loader!../svg/Exit.svg'
import SaveIcon from '-!react-svg-loader!../svg/Save.svg'
import AddIcon from '-!react-svg-loader!../svg/Add.svg'
import SaveDisabledIcon from '-!react-svg-loader!../svg/SaveDisabled.svg'

export default function SubRibbon({
  preview,
  lock,
  save,
  previewHandler,
  lockHandler,
  addHandler,
  saveHandler,
  settingsHandler
}) {
  return (
    <div className="sub-ribbon-container row-box align-center-box">

      {!lock && (
        <Button
          color="primary"
          onClick={() => previewHandler()}
        >
          {preview ? <BackIcon /> : <PreviewIcon />}
          <div className="nowrap m-l-10">{preview ? 'BACK' : 'GENERATE PDF'}</div>
        </Button>
      )}

      {!preview && (
        <Button
          color="primary"
          onClick={() => lockHandler(!lock)}
        >
          {lock ? <ExitIcon /> : <EditIcon />}
          <div className="nowrap m-l-10">{lock ? 'EXIT' : 'EDIT'}</div>
        </Button>
      )}

      {!preview && lock && (
        <Fragment>

          <Button
            color="primary"
            onClick={() => addHandler()}
          >
            <AddIcon />
            <div className="nowrap m-l-10">ADD CELL</div>
          </Button>

          <Button
            color="primary"
            disabled={!save}
            onClick={() => saveHandler()}
          >
            {save ? <SaveIcon /> : <SaveDisabledIcon />}
            <div className="nowrap m-l-10">SAVE</div>
          </Button>

          <Button
            color="primary"
            onClick={() => settingsHandler()}
          >
            <SettingsIcon />
            <div className="nowrap m-l-10">SETTINGS</div>
          </Button>
        </Fragment>
      )}
    </div>
  )
}

SubRibbon.propTypes = {
  preview: PropTypes.bool,
  lock: PropTypes.bool,
  save: PropTypes.bool,
  previewHandler: PropTypes.func.isRequired,
  lockHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  settingsHandler: PropTypes.func.isRequired
}
