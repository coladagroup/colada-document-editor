import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import PreviewIcon from '@material-ui/icons/Visibility'
import SettingsIcon from '@material-ui/icons/Settings'

import EditIcon from '-!react-svg-loader!../svg/Edit.svg'
import ExitIcon from '-!react-svg-loader!../svg/Exit.svg'
import SaveIcon from '-!react-svg-loader!../svg/Save.svg'
import SaveDisabledIcon from '-!react-svg-loader!../svg/SaveDisabled.svg'

export default function SubRibbon({ lock, save, lockHandler, saveHandler, settingsHandler }) {
  return (
    <div className="sub-ribbon-container row-box align-center-box">

      <Button color="primary">
        <PreviewIcon />
        <div className="nowrap m-l-10">PREVIEW</div>
      </Button>

      <Button
        color="primary"
        onClick={() => lockHandler(!lock)}
      >
        {lock ? <ExitIcon /> : <EditIcon />}
        <div className="nowrap m-l-10">{lock ? 'EXIT' : 'EDIT'}</div>
      </Button>

      {lock && (
        <Fragment>

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
  lock: PropTypes.bool,
  save: PropTypes.bool,
  lockHandler: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  settingsHandler: PropTypes.func.isRequired
}
