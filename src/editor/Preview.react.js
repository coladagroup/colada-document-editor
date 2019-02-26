import React from 'react'
import PropTypes from 'prop-types'
import { Font, StyleSheet, Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer'

import { calculatePageWidth } from '../utils/FormatUtils'

Font.register(
  'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
  { family: 'Roboto' },
)

// x: 0, y: 0, w: 2, h: 2

const styles = StyleSheet.create({
  page: { margin: 10, fontFamily: 'Roboto' }
})

export default function Preview({ format, orientation, layout }) {
  const width = calculatePageWidth(format, orientation)
  const columnWidth = width / 12

  function getViewStyle(item) {
    return {
      position: 'absolute',
      left: (item.x * columnWidth) + 10,
      top: item.y * 40,
      width: item.w * columnWidth,
      height: ((item.h - 1) * 40) + 30
    }
  }

  return (
    <PDFViewer className="preview-container">
      <Document>
        <Page
          size={format}
          orientation={orientation}
          style={styles.page}
          wrap={false}
        >
          {layout && layout.map(item => (
            <View key={item.i} style={getViewStyle(item)}>
              <Text>{item.content}</Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  )
}

Preview.propTypes = {
  format: PropTypes.string,
  orientation: PropTypes.string,
  layout: PropTypes.array
}
