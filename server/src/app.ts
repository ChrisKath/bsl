import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'path'
import { createConnection } from 'typeorm'
import connectionOptions from './database/ormconfig'
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
    this.app.use(express.urlencoded({ extended: false }))

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

  private async createDatabaseConnection (): Promise<void> {
    try {
      await createConnection()
      console.info('[server] Database connected')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Listen for connections
   */
  public listen (): void {
    this.app.listen(this.port, () => {
      this.createDatabaseConnection()
      console.log(`[server] Application listening on port: ${this.port}`)
    })
  }
}