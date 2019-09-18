import React from 'react'
import PropTypes from 'prop-types'
import FroalaEditor from 'react-froala-wysiwyg'

import { KEY, SCAYT_KEY } from './constants'
import './richTextEditor.scss'

const propTypes = {
  /**
  * Text string value
  */
  text: PropTypes.string,
  /**
  * Disabled input
  */
  disabled: PropTypes.bool,
  /**
   * Determines if disabled state should act as inline
   */
  inlineDisabled: PropTypes.bool,
  /**
  * Froala editor config overrides object
  */
  config: PropTypes.object,
  /**
   * Determines if editor should be showed inside mobile device context
   */
  isMobileContext: PropTypes.bool,
  /**
  * Model change handler, receives text model value as parameter
  */
  onModelChange: PropTypes.func
}
const defaultProps = {
  inlineDisabled: false,
  isMobileContext: false
}

const CONFIG = {
  charCounterCount: false,
  key: KEY,
  scaytCustomerId: SCAYT_KEY,
  scaytAutoload: true,
  scaytOptions: {
    enableOnTouchDevices: true,
    localization: 'de',
    extraModules: 'ui',
    DefaultSelection: 'Germany German',
    spellcheckLang: 'de_DE',
    contextMenuSections: 'suggest|moresuggest'
  },
  placeholderText: 'Type...',
  heightMin: 30,
  toolbarInline: true,
  videoMaxSize: 1024 * 1024 * 100,
  videoAllowedTypes: ['mp4', 'webm', 'ogg', 'quicktime'],
  fileMaxSize: 1024 * 1024 * 100,
  imageMaxSize: 1024 * 1024 * 10,
  imageAllowedTypes: ['jpeg', 'jpg', 'png', 'tif', 'gif']
}

function RichTextEditor({ text, disabled, inlineDisabled, config, isMobileContext, onModelChange }) {
  return disabled ? (
    <div
      className={`rich-text-disabled ${inlineDisabled ? `inline-disabled-text
      ${isMobileContext ? 'inline-disabled-text__mobile' : ''}` : ''}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ) : (
    <FroalaEditor
      tag="textarea"
      config={{ ...CONFIG, ...config }}
      model={text}
      onModelChange={onModelChange}
    />
  )
}

RichTextEditor.propTypes = propTypes
RichTextEditor.defaultProps = defaultProps

export default RichTextEditor
