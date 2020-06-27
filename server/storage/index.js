const { existsSync, unlinkSync } = require('fs')
const { join } = require('path')
const multer = require('multer')

module.exports = {
  avatar: multer({
    dest: join(__dirname, 'avatar'),
    limits: {
      fileSize: 4e+6 // 4MB
    }
  }),

  icons: multer({
    dest: join(__dirname, 'icons'),
    limits: {
      fileSize: 256e3 // 256KB
    }
  }),

  /**
   * Remove file
   */
  removeFile: (dest, fileName) => {
    const dir = join(__dirname, `${dest}/${fileName}`)
    if (existsSync(dir)) unlinkSync(dir)
  }
}