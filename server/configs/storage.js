const multer = require('multer')
const path = require('path')

module.exports = multer({
  storage: path.join(__dirname, '../storage'),
  limits: {
    fileSize: 4e+6 // 4mb
  }
})