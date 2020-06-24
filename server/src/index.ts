import { isProduction, port } from './configs/app'
import express from 'express'
import https from 'https'
import fs from 'fs'

// Initialize Application
const app: any = express()

// Start Server
if (isProduction) {
  https.createServer({
    key : fs.readFileSync('./storage/key.pem', 'utf8'),
    cert: fs.readFileSync('./storage/cert.pem', 'utf8')
  }, app).listen(port)
} else {
  app.listen(port)
}