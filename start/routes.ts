import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.get('/api/health', async ({ response }) => {
  return response.json({ 
    status: 'ok', 
    message: 'Server is running',
    routes: [
      'GET /',
      'GET /login',
      'POST /login',      
      'GET /register',
      'POST /register',   
      'POST /logout',     
      'GET /dashboard'
    ]
  })
})

router.get('/', async ({ response }) => {
  return response.redirect('/login')
})

router.get('/login', [AuthController, 'loginPage'])      // GET - Halaman
router.post('/login', [AuthController, 'login'])         // POST - Action

router.get('/register', [AuthController, 'registerPage']) // GET - Halaman
router.post('/register', [AuthController, 'register'])    // POST - Action

router.post('/logout', [AuthController, 'logout'])        // POST - Action

router.get('/dashboard', [AuthController, 'dashboard'])   // GET - Protected

router.get('/auth/google', '#controllers/google_auth_controller.redirect')
router.get('/auth/google/callback', '#controllers/google_auth_controller.callback')