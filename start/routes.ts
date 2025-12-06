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

// router.get('/checkout', async ({ inertia, request }) => {
//   // Ambil parameter dari URL
//   const serviceId = request.input('service_id')
//   const namaService = request.input('nama_service')
//   const harga = request.input('harga')
  
//   console.log('Checkout accessed with:', { serviceId, namaService, harga })
  
//   return inertia.render('Services/Show', {
//     queryParams: {
//       service_id: serviceId,
//       nama_service: namaService,
//       harga: harga
//     }
//   })
// })

// router.get('/order-confirmation', async ({ inertia }) => {
//   return inertia.render('Services/Confirm')
// })

router.on('/').renderInertia('aboutUs')
