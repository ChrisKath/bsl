import { Router } from 'express'
import controllers from '../../controllers/user.controller'

export default class UserRoutes {
  public router: Router = Router()

  constructor () {
    this.registerRoutes()
  }

  private registerRoutes (): void {
    this.router.get('/', controllers.index)
    this.router.post('/create', controllers.create)
    this.router.get('/:id([0-9])', controllers.show)
    this.router.patch('/:id([0-9])', controllers.update)
    this.router.delete('/:id([0-9])', controllers.destroy)
  }
}