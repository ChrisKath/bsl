const multer = require('multer')
const path = require('path')

module.exports = {
  avatar: multer({
    dest: path.join(__dirname, 'avatar'),
    limits: {
      fileSize: 4e+6 // 4 MB
    }
  })
}