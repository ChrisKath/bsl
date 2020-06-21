const multer = require('multer')
const path = require('path')
const fs = require('fs')

module.exports = {
  /**
   * Remove file
   */
  removeFile: (dest, fileName) => {
    const dir = path.join(__dirname, `${dest}/${fileName}`)
    if (fs.existsSync(dir)) fs.unlinkSync(dir)
  },

  avatar: multer({
    dest: path.join(__dirname, 'avatar'),
    limits: {
      fileSize: 4e+6 // 4MB
    }
  }),

  icons: multer({
    dest: path.join(__dirname, 'icons'),
    limits: {
      fileSize: 256e3 // 256KB
    }
  })
}