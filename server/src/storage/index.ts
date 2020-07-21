import { existsSync, unlinkSync } from 'fs'
import { join } from 'path'
import multer from 'multer'

export const avatar: any = multer({
  dest: join(__dirname, 'avatar'),
  limits: {
    fileSize: 4e+6 // 4MB
  }
})

export const icons: any = multer({
  dest: join(__dirname, 'icons'),
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
export function removeFile (dest: string, fileName: string): void {
  const dir: string = join(__dirname, `${dest}/${fileName}`)
  if (existsSync(dir)) unlinkSync(dir)
}