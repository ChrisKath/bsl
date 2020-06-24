import express from 'express'
import passport from 'passport'
import { sso } from 'node-expose-sspi'
import controllers from '../../controllers/auth.controller'
import storages from '../../storages'

// Init Variable.
const router: any = express.Router()
const Authenticate: any = passport.authenticate('jwt', { session: false })
const SingleSignOn: any = sso.auth({ useActiveDirectory: true, useGroups: false })
const AvatarFile: any = storages.avatar.single('avatar')

router.post('/login', SingleSignOn, controllers.login)
router.get('/sso', SingleSignOn, controllers.sso)
router.get('/me', Authenticate, controllers.me)
router.get('/refreshToken', Authenticate, controllers.refresh)
router.post('/profile', [Authenticate, AvatarFile], controllers.profile)

export default router