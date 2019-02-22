import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import Editor from './editor'
import './styles/base.scss'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: 'transparent',
        minWidth: 'auto'
      },
      outlined: {
        border: '1px solid #AFAFAF',
        backgroundColor: '#FFFFFF',
        fontSize: 13,
        fontWeight: 500,
        textTransform: 'none'
      },
      outlinedPrimary: {
        border: '1px solid #AFAFAF',
        backgroundColor: '#FFFFFF',
        fontSize: 13,
        fontWeight: 500,
        textTransform: 'none'
      },
      containedSecondary: {
        backgroundColor: '#11B063',
        fontSize: 13,
        fontWeight: 500,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: fade('#11B063', 0.75),
          '@media (hover: none)': {
            backgroundColor: '#11B063'
          }
        }
      }
    },
    MuiTabs: {
      root: {
        borderBottom: '1px solid rgba(0,0,0,0.12)'
      }
    },
    MuiListItem: {
      root: {
        '&$selected, &$selected:hover': {
          backgroundColor: 'rgba(63,81,181,0.12)'
        }
      }
    },
    MuiAppBar: {
      colorSecondary: {
        backgroundColor: '#11B063'
      }
    }
  }
})

/**
 * Main portal. Apply MUI theme customization here.
 */
export default function Portal() {
  return (
    <MuiThemeProvider theme={theme}>
      <Editor />
    </MuiThemeProvider>
  )
}
