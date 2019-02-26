import * as Format from '../constants/FormatConstants'

export function calculatePageWidth(format, orientation) {
  let width = 0

  if (format === Format.A4) {
    width = orientation === Format.ORIENTATION_LANDSCAPE ? 1122 : 793
  } else if (format === Format.A3) {
    width = orientation === Format.ORIENTATION_LANDSCAPE ? 1587 : 1122
  } else if (format === Format.A5) {
    width = orientation === Format.ORIENTATION_LANDSCAPE ? 793 : 559
  } else if (format === Format.LETTER) {
    width = orientation === Format.ORIENTATION_LANDSCAPE ? 1058 : 816
  } else if (format === Format.LEGAL) {
    width = orientation === Format.ORIENTATION_LANDSCAPE ? 1349 : 816
  }

  return width
}
