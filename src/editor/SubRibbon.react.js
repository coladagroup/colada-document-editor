import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import PreviewIcon from '@material-ui/icons/Visibility'
import InteractionIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'

import EditIcon from '-!react-svg-loader!../svg/Edit.svg'
import ExitIcon from '-!react-svg-loader!../svg/Exit.svg'
import SaveIcon from '-!react-svg-loader!../svg/Save.svg'
import AddIcon from '-!react-svg-loader!../svg/Add.svg'
import SaveDisabledIcon from '-!react-svg-loader!../svg/SaveDisabled.svg'

export default function SubRibbon({
  lock,
  interaction,
  save,
  previewHandler,
  lockHandler,
  interactionHandler,
  addHandler,
  saveHandler
}) {
  return (
    <div className="sub-ribbon-container row-box align-center-box">

      {!lock && (
        <Button
          color="primary"
          onClick={previewHandler}
        >
          <PreviewIcon />
          <div className="nowrap m-l-10">PREVIEW PDF</div>
        </Button>
      )}

      <Button
        color="primary"
        onClick={() => lockHandler(!lock)}
      >
        {lock ? <ExitIcon /> : <EditIcon />}
        <div className="nowrap m-l-10">{lock ? 'EXIT' : 'EDIT'}</div>
      </Button>

      {lock && (
        <Fragment>

          <Tooltip
            title={interaction ? 'Note: Cell content will become editable' : 'Note: Cell content will not be editable'}
          >
            <Button
              color="primary"
              onClick={interactionHandler}
            >
              {interaction ? <LockIcon /> : <InteractionIcon />}
              <div className="nowrap m-l-10">{interaction ? 'LOCK CELLS' : 'UNLOCK CELLS'}</div>
            </Button>
          </Tooltip>

          <Button
            color="primary"
            onClick={addHandler}
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
        </Fragment>
      )}
    </div>
  )
}

SubRibbon.propTypes = {
  lock: PropTypes.bool.isRequired,
  interaction: PropTypes.bool.isRequired,
  save: PropTypes.bool.isRequired,
  previewHandler: PropTypes.func.isRequired,
  lockHandler: PropTypes.func.isRequired,
  interactionHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired
}
