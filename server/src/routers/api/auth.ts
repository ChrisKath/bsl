import { Router } from 'express'
import { sso } from 'node-expose-sspi'
import passport from 'passport'
import controllers from '../../controllers/auth.controller'
import { avatar } from '../../storage'

export default class AuthRoutes {
  public router: Router = Router()
  private authenticate: any
  private singleSignOn: any
  private avatarFile: any
  
  constructor () {
    // Middleware
    this.authenticate = passport.authenticate('jwt', { session: false })
    this.singleSignOn = sso.auth({ useGroups: false })
    this.avatarFile = avatar.single('avatar')

    this.registerRoutes()
  }

  private registerRoutes (): void {
    this.router.post('/login', controllers.login)
    this.router.get('/sso', this.singleSignOn, controllers.sso)
    this.router.get('/me', this.authenticate, controllers.me)
    this.router.get('/refreshToken', this.authenticate, controllers.refresh)
    this.router.post('/profile', [this.authenticate, this.avatarFile], controllers.profile)
  }
}