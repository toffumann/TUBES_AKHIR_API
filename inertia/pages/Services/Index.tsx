import { Head } from '@inertiajs/react'
import Layout from '../../Layouts/Layout'
import ServiceCard from '../../components/ServiceCard'
import CategoryFilter from '../../components/CategoryFilter'
import { useState } from 'react'

export default function ServicesIndex() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [priceFilter, setPriceFilter] = useState('all')
  
  // Mock data
  const services = [
    {
      id: 1,
      name: 'Logo Design Professional',
      slug: 'logo-design-professional',
      description: 'Desain logo custom dengan 3 konsep berbeda, termasuk file vector dan panduan branding',
      category: {
        name: 'Logo & Branding',
        slug: 'logo-branding'
      },
      basePrice: 2500000,
      discountPrice: 1999000,
      deliveryDays: 7,
      revisionLimit: 3,
      orderCount: 42,
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop',
      features: [
        '3 Konsep logo berbeda',
        'File vector (AI, EPS, SVG)',
        'File PNG & JPG high-res',
        'Color palette guide',
        'Brand guideline basic',
        'Revisi 3x'
      ]
    },
    {
      id: 2,
      name: 'UI/UX Mobile App',
      slug: 'ui-ux-mobile-app',
      description: 'Desain user interface dan experience untuk aplikasi mobile dengan prototype interaktif',
      category: {
        name: 'UI/UX Design',
        slug: 'ui-ux-design'
      },
      basePrice: 8000000,
      deliveryDays: 14,
      revisionLimit: 4,
      orderCount: 28,
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      features: [
        'Wireframe & user flow',
        'UI design semua screen',
        'Prototype interaktif',
        'Design system',
        'Responsive design',
        'Developer handoff'
      ]
    },
    {
      id: 3,
      name: 'Social Media Kit',
      slug: 'social-media-kit',
      description: 'Paket lengkap desain konten media sosial untuk 1 bulan dengan template yang konsisten',
      category: {
        name: 'Social Media',
        slug: 'social-media'
      },
      basePrice: 3000000,
      discountPrice: 2499000,
      deliveryDays: 5,
      revisionLimit: 3,
      orderCount: 56,
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
      features: [
        '12 post Instagram',
        '8 story templates',
        'Cover Facebook & LinkedIn',
        'Banner YouTube',
        'Branded templates PSD',
        'Content calendar'
      ]
    },
    {
      id: 4,
      name: 'Website Redesign',
      slug: 'website-redesign',
      description: 'Modernisasi website existing dengan desain yang fresh dan user experience yang lebih baik',
      category: {
        name: 'Web Design',
        slug: 'web-design'
      },
      basePrice: 12000000,
      deliveryDays: 21,
      revisionLimit: 5,
      orderCount: 19,
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      features: [
        'Website audit',
        'UI/UX redesign',
        'Responsive semua device',
        'Performance optimization',
        'SEO friendly',
        'CMS integration'
      ]
    },
    {
      id: 5,
      name: 'Packaging Design',
      slug: 'packaging-design',
      description: 'Desain kemasan produk yang eye-catching dan sesuai dengan brand identity',
      category: {
        name: 'Print Design',
        slug: 'print-design'
      },
      basePrice: 4500000,
      discountPrice: 3999000,
      deliveryDays: 10,
      revisionLimit: 4,
      orderCount: 31,
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      features: [
        '3D mockup packaging',
        'Print-ready files',
        'Die-line setup',
        'Material recommendation',
        'Color separation',
        'Production guidance'
      ]
    },
    {
      id: 6,
      name: 'Brand Identity Full Package',
      slug: 'brand-identity-full-package',
      description: 'Paket lengkap identitas merek dari logo hingga aplikasi di berbagai media',
      category: {
        name: 'Branding',
        slug: 'branding'
      },
      basePrice: 15000000,
      discountPrice: 12990000,
      deliveryDays: 30,
      revisionLimit: 6,
      orderCount: 14,
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      features: [
        'Logo & variasi',
        'Brand guideline book',
        'Stationery design',
        'Marketing materials',
        'Social media kit',
        'Brand audit'
      ]
    }
  ]

  const categories = [
    { id: 1, name: 'Logo & Branding', slug: 'logo-branding', icon: '🎨' },
    { id: 2, name: 'UI/UX Design', slug: 'ui-ux-design', icon: '📱' },
    { id: 3, name: 'Social Media', slug: 'social-media', icon: '📸' },
    { id: 4, name: 'Web Design', slug: 'web-design', icon: '🌐' },
    { id: 5, name: 'Print Design', slug: 'print-design', icon: '🖨️' },
    { id: 6, name: 'Branding', slug: 'branding', icon: '🏷️' },
    { id: 7, name: 'Illustration', slug: 'illustration', icon: '✏️' },
    { id: 8, name: 'Motion Graphics', slug: 'motion-graphics', icon: '🎬' }
  ]

  const filteredServices = services.filter(service => {
    // Filter by search
    if (search && !service.name.toLowerCase().includes(search.toLowerCase()) && 
        !service.description.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    
    // Filter by price
    if (priceFilter === 'under-3' && service.basePrice && service.basePrice >= 3000000) return false
    if (priceFilter === '3-10' && service.basePrice && 
        (service.basePrice < 3000000 || service.basePrice > 10000000)) return false
    if (priceFilter === 'above-10' && service.basePrice && service.basePrice <= 10000000) return false
    if (priceFilter === 'custom' && service.basePrice) return false
    
    return true
  })

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch(sort) {
      case 'price-low':
        return (a.discountPrice || a.basePrice || 0) - (b.discountPrice || b.basePrice || 0)
      case 'price-high':
        return (b.discountPrice || b.basePrice || 0) - (a.discountPrice || a.basePrice || 0)
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
        <meta name="description" content="Temukan berbagai layanan desain profesional untuk kebutuhan bisnis Anda. Dari logo, website, hingga branding lengkap." />
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 md:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Layanan Desain
              <span className="block text-2xl md:text-3xl text-purple-600 mt-2">
                Profesional & Terstruktur
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Pilih dari berbagai layanan desain yang dikelola secara profesional melalui platform kami. 
              Semua proses transparan, dari brief hingga delivery.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{services.length}+</div>
                <div className="text-sm text-gray-600">Layanan</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Kepuasan Klien</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{services.reduce((sum, s) => sum + s.orderCount, 0)}+</div>
                <div className="text-sm text-gray-600">Project Selesai</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <CategoryFilter 
                categories={categories} 
                selectedCategory={undefined} 
              />
              
              {/* Filter by Price */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter Harga</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Semua Harga', value: 'all' },
                    { label: 'Dibawah Rp 3jt', value: 'under-3' },
                    { label: 'Rp 3jt - 10jt', value: '3-10' },
                    { label: 'Diatas Rp 10jt', value: 'above-10' },
                    { label: 'Custom Price', value: 'custom' }
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

              {/* Popular Tags */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Tag Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {['Logo', 'Branding', 'UI/UX', 'Website', 'Mobile', 'Packaging', 'Social Media', 'Marketing'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
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
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {sortedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Empty State */}
            {sortedServices.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Layanan tidak ditemukan</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori lainnya.
                </p>
                <button 
                  onClick={() => {
                    setSearch('')
                    setPriceFilter('all')
                  }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Load More */}
            {sortedServices.length > 0 && (
              <div className="text-center mt-12">
                <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                  Tampilkan Lebih Banyak
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tidak Menemukan yang Cocok?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Kami bisa membuatkan layanan custom sesuai kebutuhan spesifik Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-2xl">
              💬 Konsultasi Gratis
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition">
              📞 Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}