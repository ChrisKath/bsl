import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'path'
import { createConnection } from 'typeorm'
import { corsOrigin } from './helpers/cors.helper'
import { errorEndpoint, errorHandler } from './configs/errorHandler'
import Routers from './routers'
// import './configs/passport'

export default class App {
  private app: Application
  private port: number
  private production: boolean

  constructor (port: number, production: boolean) {
    this.app = express()
    this.port = port
    this.production = production

    this.registerMiddlewares()
    this.registerRouters()
    this.registerErrorHandling()
  }

  private registerMiddlewares (): void {
    // CORS
    this.app.use(cors({
      origin: corsOrigin,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      preflightContinue: true,
      credentials: true,
      maxAge: 3600
    }))

    // Parser Body
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // Logger
    this.app.use(morgan('dev'))

    // Static file
    this.app.use('/', express.static(join(__dirname, 'public')))

    // Passport
    require('./configs/passport')
  }

  private registerRouters (): void {
    const r = new Routers()
    this.app.use(r.router)
  }

  private registerErrorHandling (): void {
    this.app.use(errorEndpoint)
    this.app.use(errorHandler)
  }

  /**
   * Listen for connections
   */
  public async listen (): Promise<void> {
    console.info('[server] Database connecting...')

    try {
      await createConnection()
      console.info('[server] Database connection completed.')

      this.app.listen(this.port, (): void => {
        console.info(`[server] Application listening on port: ${this.port}`)
      })
    } catch (error) {
      console.error(error)
    }
  }
}