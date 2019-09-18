import React from 'react'

import ThemeContainer from './ThemeContainer.react'
import Editor from './editor'
import './styles/base.scss'

function Root() {
  return (
    <ThemeContainer>
      <Editor />
    </ThemeContainer>
  )
}

export default Root
