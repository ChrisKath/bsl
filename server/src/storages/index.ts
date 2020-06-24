import multer from 'multer'
import path from 'path'
import fs from 'fs'

export default {
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
  }),

  /**
   * Remove file
   */
  removeFile: (dest: string, fileName: string): void => {
    const dir = path.join(__dirname, `${dest}/${fileName}`)
    if (fs.existsSync(dir)) fs.unlinkSync(dir)
  }
}