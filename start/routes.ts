/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UserAuthsController from '#controllers/user_auths_controller'
import { middleware } from './kernel.js'

//router.on('/').renderInertia('home')

router.post('/register', [UserAuthsController, 'Register'])
router.post('/login', [UserAuthsController, 'Login'])

router.get('/login', ({inertia}) => inertia.render('/Login'))
router.get('/register', ({inertia}) => inertia.render('/Register'))

router.get('/dashboard', ({inertia}) => inertia.render('Dashboard')).use(middleware.auth({guards: ['api']}))