import React, { useContext, Fragment } from 'react'
import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import PreviewIcon from '@material-ui/icons/Visibility'
import InteractionIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'

import { DocumentsEditorContext } from './index'
import EditIcon from '-!react-svg-loader!../svg/Edit.svg'
import ExitIcon from '-!react-svg-loader!../svg/Exit.svg'
import SaveIcon from '-!react-svg-loader!../svg/Save.svg'
import AddIcon from '-!react-svg-loader!../svg/Add.svg'
import SaveDisabledIcon from '-!react-svg-loader!../svg/SaveDisabled.svg'

const uuidv1 = require('uuid/v1')

const stores = [IndexedDbStore, LocalStorageStore, SessionStorageStore]
const db = new ImmortalStorage(stores)

export default function SubRibbon() {
  const {
    preview,
    lock,
    interaction,
    save,
    name,
    format,
    orientation,
    layout,
    dispatch,
    fetchData
  } = useContext(DocumentsEditorContext)

  async function handleSave() {
    await db.set('document', JSON.stringify({ name, format, orientation, layout }))

    dispatch({ type: 'save', value: false })
  }

  function addCellHandler() {
    const cell = { i: uuidv1(), x: 0, y: 0, w: 2, h: 2 }
    const value = layout ? [...layout, cell] : [cell]

    dispatch({ type: 'layout', value })
  }

  function handleInteraction() {
    dispatch({ type: 'interaction', value: !interaction })
  }

  function handleLock() {
    dispatch({ type: 'lock', value: !lock })

    if (lock) {
      fetchData()

      dispatch({ type: 'interaction', value: false })
    }
  }

  function handlePreview() {
    dispatch({ type: 'preview', value: !preview })
  }

  return (
    <div className="sub-ribbon-container row-box align-center-box">

      {!lock && (
        <Button
          color="primary"
          onClick={handlePreview}
        >
          <PreviewIcon />
          <div className="nowrap m-l-10">PREVIEW PDF</div>
        </Button>
      )}

      <Button
        color="primary"
        onClick={handleLock}
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
              onClick={handleInteraction}
            >
              {interaction ? <LockIcon /> : <InteractionIcon />}
              <div className="nowrap m-l-10">{interaction ? 'LOCK CELLS' : 'UNLOCK CELLS'}</div>
            </Button>
          </Tooltip>

          <Button
            color="primary"
            onClick={addCellHandler}
          >
            <AddIcon />
            <div className="nowrap m-l-10">ADD CELL</div>
          </Button>

          <Button
            color="primary"
            disabled={!save}
            onClick={handleSave}
          >
            {save ? <SaveIcon /> : <SaveDisabledIcon />}
            <div className="nowrap m-l-10">SAVE</div>
          </Button>
        </Fragment>
      )}
    </div>
  )
}
