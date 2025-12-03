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
router.post('/logout', [UserAuthsController, 'Logout'])

router.get('/', async ({ inertia }) => {
  return inertia.render('Home')
})

router.get('/login', async ({ inertia }) => {
  return inertia.render('login')
})

router.get('/register', async ({ inertia }) => {
  return inertia.render('register')
})



// Protected routes
router.get('/dashboard', async ({ inertia }) => {
  return inertia.render('Dashboard')
}).use(middleware.auth())  // ← Gunakan middleware auth

router.get('/profile', async ({ inertia }) => {
  return inertia.render('Profile')
}).use(middleware.auth())