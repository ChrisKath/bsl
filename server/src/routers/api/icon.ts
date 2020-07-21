import { Router } from 'express'
import controllers from '../../controllers/icon.controller'

export default class IconRoutes {
  public router: Router = Router()

  constructor () {
    this.registerRoutes()
  }

  private registerRoutes (): void {
    this.router.get('/', controllers.index)
    this.router.post('/create', controllers.create)
    this.router.get('/:id(\d)', controllers.show)
    this.router.patch('/:id(\d)', controllers.update)
    this.router.delete('/:id(\d)', controllers.destroy)
  }
}