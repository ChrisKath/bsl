import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'path'
import { createConnection, Connection } from 'typeorm'
import { corsOrigin } from '@/helpers/cors.helper'
import { errorEndpoint, errorHandler } from '@/configs/errorHandler'
import Routers from '@/routers'
// import '@/configs/passport'

export default class App {
  public app: Application
  public port: number
  public production: boolean

  constructor (port: number, production: boolean) {
    this.app = express()
    this.port = port
    this.production = production

    this.initializeMiddlewares()
    this.initializeRouters()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares (): void {
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
    this.app.use('/', express.static(join(__dirname, '../public')))

    // Passport
    require('@/configs/passport')
  }

  private initializeRouters (): void {
    const r = new Routers()
    this.app.use(r.router)
  }

  private initializeErrorHandling (): void {
    this.app.use(errorEndpoint)
    this.app.use(errorHandler)
  }

  private createDatabaseConnection (): void {
    createConnection()
      .then((connection: Connection): void => {
        console.log('Database connected')
      })
      .catch((error: any): void => console.error(error))
  }

  /**
   * Listen for connections
   */
  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Application listening on port ${this.port}`)
      this.createDatabaseConnection()
    })
  }
}