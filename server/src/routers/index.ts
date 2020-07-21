import { Router } from 'express'
import passport from 'passport'
import { apiVersion } from '../configs/app'
import controllers from '../controllers/main.controller'

// api routes
import AuthRoutes from './api/auth'
import UserRoutes from './api/user'
import UrlRoutes from './api/url'
import TagRoutes from './api/tag'
import IconRoutes from './api/icon'

export default class ApplicationRouters {
  public router: Router = Router()
  private authenticate: any
  
  constructor () {
    // Middleware
    this.authenticate = passport.authenticate('jwt', { session: false })

    // APIs
    this.registerApiRoutes()

    // Any url endpoint
    this.router.get('*', controllers.index)
  }

  /**
   * Register APIs routes
   */
  private registerApiRoutes (): void {
    const basePath: string = `/api/v${apiVersion}`

    this.router.use(`${basePath}/auth`, new AuthRoutes().router)
    this.router.use(`${basePath}/user`, this.authenticate, new UserRoutes().router)
    this.router.use(`${basePath}/url`,  this.authenticate, new UrlRoutes().router)
    this.router.use(`${basePath}/tag`,  this.authenticate, new TagRoutes().router)
    this.router.use(`${basePath}/icon`, this.authenticate, new IconRoutes().router)

    // Gatter storage file
    this.router.get('/f/:dest/:name', controllers.file)
    this.router.get('/d3m0', controllers.d3m0)
  }
}