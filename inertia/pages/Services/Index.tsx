import { Head } from '@inertiajs/react'
import Layout from '../../Layouts/Layout'
import ServiceCard from '../../components/ServiceCard'
import { useState } from 'react'

// Interface sesuai model 100%
interface ServiceData {
  id: number
  nama_service: string
  deskripsi: string | null
  harga: number
}

export default function ServicesIndex() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [priceFilter, setPriceFilter] = useState('all')
  
  // Data 100% sesuai model
  const services: ServiceData[] = [
    {
      id: 1,
      nama_service: 'Logo Design Professional',
      deskripsi: 'Desain logo custom dengan 3 konsep berbeda, termasuk file vector dan panduan branding',
      harga: 2500000
    },
    {
      id: 2,
      nama_service: 'UI/UX Mobile App',
      deskripsi: 'Desain user interface dan experience untuk aplikasi mobile dengan prototype interaktif',
      harga: 8000000
    },
    {
      id: 3,
      nama_service: 'Social Media Kit',
      deskripsi: 'Paket lengkap desain konten media sosial untuk 1 bulan dengan template yang konsisten',
      harga: 3000000
    },
    {
      id: 4,
      nama_service: 'Website Redesign',
      deskripsi: 'Modernisasi website existing dengan desain yang fresh dan user experience yang lebih baik',
      harga: 12000000
    },
    {
      id: 5,
      nama_service: 'Packaging Design',
      deskripsi: 'Desain kemasan produk yang eye-catching dan sesuai dengan brand identity',
      harga: 4500000
    },
    {
      id: 6,
      nama_service: 'Brand Identity Full Package',
      deskripsi: 'Paket lengkap identitas merek dari logo hingga aplikasi di berbagai media',
      harga: 15000000
    }
  ]

  // Konversi data ke format ServiceCard
  const servicesForCard = services.map(service => ({
    id: service.id,
    nama_service: service.nama_service,
    deskripsi: service.deskripsi || '',
    harga: service.harga,
    // Generate data tambahan dari nama
    slug: service.nama_service
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 50),
    // Kategori default (generate dari kata pertama nama_service)
    category: {
      name: getCategoryFromName(service.nama_service),
      slug: getCategoryFromName(service.nama_service).toLowerCase().replace(/\s+/g, '-')
    },
    // Default values
    deliveryDays: 7,
    revisionLimit: 3,
    orderCount: Math.floor(Math.random() * 100) + 10, // Random untuk demo
    isPopular: Math.random() > 0.5, // Random untuk demo
    features: ['Desain berkualitas tinggi', 'File source lengkap', 'Garansi revisi']
  }))

  // Helper function untuk menentukan kategori
  function getCategoryFromName(name: string): string {
    if (name.toLowerCase().includes('logo')) return 'Logo & Branding'
    if (name.toLowerCase().includes('ui') || name.toLowerCase().includes('app')) return 'UI/UX Design'
    if (name.toLowerCase().includes('social') || name.toLowerCase().includes('media')) return 'Social Media'
    if (name.toLowerCase().includes('website') || name.toLowerCase().includes('web')) return 'Web Design'
    if (name.toLowerCase().includes('packaging')) return 'Print Design'
    if (name.toLowerCase().includes('brand')) return 'Branding'
    return 'General'
  }

  const categories = [
    { id: 1, name: 'Semua', slug: 'all', icon: '🎨' },
    { id: 2, name: 'Logo & Branding', slug: 'logo-branding', icon: '🎨' },
    { id: 3, name: 'UI/UX Design', slug: 'ui-ux-design', icon: '📱' },
    { id: 4, name: 'Social Media', slug: 'social-media', icon: '📸' },
    { id: 5, name: 'Web Design', slug: 'web-design', icon: '🌐' },
    { id: 6, name: 'Print Design', slug: 'print-design', icon: '🖨️' },
    { id: 7, name: 'Branding', slug: 'branding', icon: '🏷️' }
  ]

  // Filter services
  const filteredServices = servicesForCard.filter(service => {
    // Filter by search
    if (search && !service.nama_service.toLowerCase().includes(search.toLowerCase()) && 
        !service.deskripsi.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    
    // Filter by price
    if (priceFilter === 'under-3' && service.harga >= 3000000) return false
    if (priceFilter === '3-10' && (service.harga < 3000000 || service.harga > 10000000)) return false
    if (priceFilter === 'above-10' && service.harga <= 10000000) return false
    
    return true
  })

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch(sort) {
      case 'price-low':
        return a.harga - b.harga
      case 'price-high':
        return b.harga - a.harga
      case 'newest':
        return b.id - a.id
      case 'popular':
      default:
        return b.orderCount - a.orderCount
    }
  })

  return (
    <Layout title="Layanan Desain">
      <Head>
        <title>Layanan Desain - Desain Aja Dulu</title>
        <meta name="description" content="Temukan berbagai layanan desain profesional untuk kebutuhan bisnis Anda." />
      </Head>

      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Layanan Desain Profesional</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Pilih dari berbagai layanan desain yang dikelola secara profesional melalui platform kami.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">{services.length}+</div>
              <div className="text-sm opacity-90">Layanan</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm opacity-90">Kepuasan</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">{servicesForCard.reduce((sum, s) => sum + s.orderCount, 0)}+</div>
              <div className="text-sm opacity-90">Project</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              {/* Kategori */}
              <div className="bg-white p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Kategori</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded"
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span className="text-gray-700">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filter Harga */}
              <div className="bg-white p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter Harga</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Semua Harga', value: 'all' },
                    { label: 'Dibawah Rp 3jt', value: 'under-3' },
                    { label: 'Rp 3jt - 10jt', value: '3-10' },
                    { label: 'Diatas Rp 10jt', value: 'above-10' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="price" 
                        value={option.value} 
                        checked={priceFilter === option.value}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tag Populer */}
              <div className="bg-white p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Tag Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {['Logo', 'Branding', 'UI/UX', 'Website', 'Mobile', 'Social Media'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            {/* Sort & Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="text-gray-600">
                Menampilkan <span className="font-semibold">{sortedServices.length}</span> layanan
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari layanan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-purple-500 w-64"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Empty State */}
            {sortedServices.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Layanan tidak ditemukan</h3>
                <p className="text-gray-600 mb-6">
                  Coba gunakan kata kunci pencarian yang berbeda.
                </p>
                <button 
                  onClick={() => {
                    setSearch('')
                    setPriceFilter('all')
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Tidak Menemukan yang Cocok?
          </h2>
          <p className="mb-6 max-w-xl mx-auto opacity-90">
            Kami bisa membuatkan layanan custom sesuai kebutuhan spesifik Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 px-6 py-3 rounded font-medium hover:bg-gray-100">
              💬 Konsultasi Gratis
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded font-medium hover:bg-white/10">
              📞 Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}