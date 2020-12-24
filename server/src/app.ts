import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'path'
import { errorEndpoint, errorHandler } from './configs/errorHandler'
import { createDatabaseConnection } from './database'
import { corsOrigin } from './helpers/cors'
import Routers from './routers'
import './configs/passport'

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
      origin: (this.production ? corsOrigin : '*'),
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
    this.app.use('/', express.static(join(__dirname, '../public')))
  }

  private registerRouters (): void {
    const r: Routers = new Routers()
    this.app.use(r.router)
  }

  private registerErrorHandling (): void {
    this.app.use(errorEndpoint)
    this.app.use(errorHandler)
  }

  /**
   * Server Listen
   */
  public async listen (): Promise<void> {
    await createDatabaseConnection()

    this.app.listen(this.port, (): void => {
      console.info(`[server] Application listening on port: ${this.port}`)
    })
  }
}