import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

import Logo from '../svg/logo'

function Ribbon() {
  return (
    <Toolbar className="ribbon-container container-shadow">
      <Logo height={30} style={{ marginBottom: 3 }} />
    </Toolbar>
  )
}

export default Ribbon
