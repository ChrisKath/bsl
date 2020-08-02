import { existsSync, unlinkSync } from 'fs'
import { v4 as uuid4 } from 'uuid'
import { join } from 'path'
import multer from 'multer'

/**
 * The disk storage engine gives you full control on storing files to disk.
 * 
 * @param {string} dest
 */
export const diskStorage: Function = (dest: string): void => {
  return multer.diskStorage({
    destination: (req: any, file: any, callback: Function): void => {
      callback(null, join(__dirname, `../../storage/${dest}`))
    },
    filename: (req: any, file: any, callback: Function): void => {
      callback(null, uuid4())
    }
  })
}

export const avatar: any = multer({
  storage: diskStorage('avatar'),
  limits: {
    fileSize: 4e+6 // 4MB
  }
})

export const icons: any = multer({
  storage: diskStorage('icons'),
  limits: {
    fileSize: 256e3 // 256KB
  }
})

/**
 * Remove file
 * 
 * @param {string} dest
 * @param {string} fileName
 */
export const removeFile: Function = (dest: string, fileName: string): void => {
  const dir: string = join(__dirname, `../../storage/${dest}/${fileName}`)
  if (existsSync(dir)) unlinkSync(dir)
}
