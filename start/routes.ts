/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Services from '#models/services'

router.on('/').renderInertia('home')
router.get('/layanan', async ({ inertia }) => {
  const servicesData = await Services.all()
  
  const services = servicesData.map(service => ({
    id: service.id,
    nama_service: service.nama_service,
    deskripsi: service.deskripsi,
    harga: service.harga,
  }))
  
  return inertia.render('Services/Index', { services })
})
