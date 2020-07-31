import { Router } from 'express'
import { icons } from '../../storage'
import controllers from '../../controllers/icon.controller'

export default class IconRoutes {
  public router: Router = Router()
  private iconFile: any

  constructor () {
    // Middleware
    this.iconFile = icons.single('icon')

    this.registerRoutes()
  }

  private registerRoutes (): void {
    this.router.get('/', controllers.index)
    this.router.post('/create', this.iconFile, controllers.create)
    this.router.get('/:id([0-9])', controllers.show)
    this.router.patch('/:id([0-9])', this.iconFile, controllers.update)
    this.router.delete('/:id([0-9])', controllers.destroy)
  }
}