import { Router } from 'express'
import controllers from '../../controllers/icon.controller'
import { icons } from '../../helpers/storage'

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
    this.router.get('/:id(\\d+)', controllers.show)
    this.router.patch('/:id(\\d+)', this.iconFile, controllers.update)
    this.router.delete('/:id(\\d+)', controllers.destroy)
  }
}