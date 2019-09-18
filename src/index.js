/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'

import 'froala-editor/js/froala_editor.pkgd.min'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import Root from './Root.react'

render(<Root />, document.getElementById('root'))
