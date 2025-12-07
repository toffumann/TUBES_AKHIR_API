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
import ServicesController from '#controllers/services_controller'
import { middleware } from './kernel.js'
import UserController from '#controllers/users_controller'
import PaymentController from '#controllers/payments_controller'
import ProjectController from '#controllers/projects_controller'
import GoogleAuthController from '#controllers/google_auths_controller'
// ===== PUBLIC ROUTES =====
// API Routes
router.post('/register', [UserAuthsController, 'Register'])
router.post('/login', [UserAuthsController, 'Login'])
router.post('/logout', [UserAuthsController, 'Logout'])
router.post('/payment/:id', [PaymentController, 'create'])
router.post('/project', [ProjectController, 'store'])
router.post('/service', [ServicesController, 'store']) // Admin only

// Inertia Page Routes (GET)
router.get('/', async ({ inertia }) => {
  return inertia.render('dashboard')   // atau 'dashboard' sesuai kebutuhan
}).use

router.get('/login', async ({ inertia }) => {
  return inertia.render('login')
})

router.get('/register', async ({ inertia }) => {
  return inertia.render('register')
})

// ===== PROTECTED ROUTES =====
router.get('/dashboard', async ({ inertia }) => {
  return inertia.render('Dashboard')
}).use(middleware.auth())

router.get('/profile', async ({ inertia }) => {
  return inertia.render('Profile')
}).use(middleware.auth())

router.get('/me', [UserController, 'me']).use(middleware.auth())

router.get('/service/product', [ServicesController, 'index']).use(middleware.auth())

router.get('/auth/google', [GoogleAuthController, 'redirect'])
router.get('/auth/google/callback', [GoogleAuthController, 'callback'])
router.get('/auth/google/success', [GoogleAuthController, 'success'])