import { Head } from '@inertiajs/react'
import Layout from '../../Layouts/Layout'
import ServiceCard from '../../components/ServiceCard'
import { useState } from 'react'

export default function ServiceShow() {
  const [orderData, setOrderData] = useState({
    requirements: '',
    timeline: 'standard',
    files: [] as File[]
  })

  // Mock data untuk single service
  const service = {
    id: 1,
    name: 'Logo Design Professional',
    slug: 'logo-design-professional',
    description: 'Dapatkan logo yang unik dan memorable untuk brand Anda. Kami akan membuat 3 konsep logo berbeda yang sesuai dengan identitas brand Anda, dilengkapi dengan file vector untuk kebutuhan cetak dan digital.',
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
      '3 Konsep logo berbeda yang unik',
      'File vector (AI, EPS, SVG, PDF)',
      'File PNG & JPG high-resolution',
      'Color palette dan panduan warna',
      'Basic brand guideline',
      'Revisi hingga 3x',
      'Garansi kepuasan 100%',
      'File source code asli',
      'Format file print-ready',
      'Konsultasi gratis 30 menit'
    ],
    faq: [
      {
        question: 'Berapa lama pengerjaan logo?',
        answer: 'Rata-rata pengerjaan logo memakan waktu 5-7 hari kerja, tergantung kompleksitas dan revisi.'
      },
      {
        question: 'Apa saja yang perlu saya siapkan?',
        answer: 'Siapkan informasi tentang brand Anda: nama, visi misi, target audience, preferensi warna, dan contoh logo yang Anda suka.'
      },
      {
        question: 'Berapa kali revisi yang diperbolehkan?',
        answer: 'Anda mendapatkan 3 kali revisi setelah menerima konsep pertama. Revisi tambahan dikenakan biaya.'
      },
      {
        question: 'Apakah saya mendapatkan file sumbernya?',
        answer: 'Ya, Anda akan mendapatkan semua file sumber (source file) dalam format AI, EPS, SVG, dan PDF.'
      },
      {
        question: 'Bagaimana dengan hak cipta?',
        answer: 'Setelah pembayaran lunas, semua hak cipta desain sepenuhnya menjadi milik Anda.'
      }
    ],
    process: [
      { step: 1, title: 'Brief & Research', description: 'Diskusi kebutuhan dan riset kompetitor' },
      { step: 2, title: 'Concept Design', description: 'Membuat 3 konsep logo berbeda' },
      { step: 3, title: 'Revision', description: 'Revisi berdasarkan feedback Anda' },
      { step: 4, title: 'Finalization', description: 'Penyempurnaan dan persiapan file final' },
      { step: 5, title: 'Delivery', description: 'Pengiriman semua file dan dokumentasi' }
    ]
  }

  const relatedServices = [
    {
      id: 2,
      name: 'Brand Identity Package',
      slug: 'brand-identity-package',
      description: 'Paket lengkap identitas merek termasuk logo, warna, tipografi, dan panduan penggunaan',
      category: { name: 'Branding', slug: 'branding' },
      basePrice: 8000000,
      discountPrice: 6999000,
      deliveryDays: 14,
      revisionLimit: 5,
      orderCount: 28,
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      features: ['Logo', 'Color palette', 'Typography', 'Brand guidelines']
    },
    {
      id: 3,
      name: 'Social Media Branding',
      slug: 'social-media-branding',
      description: 'Desain template untuk Instagram, Facebook, dan LinkedIn yang konsisten',
      category: { name: 'Social Media', slug: 'social-media' },
      basePrice: 3500000,
      discountPrice: 2999000,
      deliveryDays: 10,
      revisionLimit: 3,
      orderCount: 56,
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
      features: ['Instagram template', 'Facebook cover', 'Story design', 'Content plan']
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Pesanan berhasil dibuat! Anda akan diarahkan ke halaman pembayaran.')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOrderData({ ...orderData, files: Array.from(e.target.files) })
    }
  }

  const hasDiscount = service.discountPrice && service.basePrice && service.discountPrice < service.basePrice
  const discountPercentage = hasDiscount && service.basePrice 
    ? Math.round((1 - service.discountPrice! / service.basePrice) * 100)
    : 0

  return (
    <Layout title={service.name}>
      <Head>
        <title>{service.name} - Desain Aja Dulu</title>
        <meta name="description" content={service.description} />
      </Head>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-purple-600">Beranda</a>
            <span className="mx-2">›</span>
            <a href="/layanan" className="hover:text-purple-600">Layanan</a>
            <span className="mx-2">›</span>
            <a href={`/layanan?category=${service.category.slug}`} className="hover:text-purple-600">
              {service.category.name}
            </a>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="md:w-2/5">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {service.imageUrl ? (
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl text-gray-400">🎨</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.isPopular && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        🔥 POPULAR
                      </span>
                    )}
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      ⏱️ {service.deliveryDays} hari pengerjaan
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      ✏️ {service.revisionLimit}x revisi
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      📊 {service.orderCount} pesanan
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="md:w-3/5">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {service.category.name}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
                  <p className="text-gray-600 text-lg mb-6">{service.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    {hasDiscount ? (
                      <div className="flex items-center flex-wrap gap-3">
                        <span className="text-4xl font-bold text-gray-900">
                          Rp {service.discountPrice!.toLocaleString('id-ID')}
                        </span>
                        <span className="text-2xl text-gray-500 line-through">
                          Rp {service.basePrice!.toLocaleString('id-ID')}
                        </span>
                        <span className="text-lg font-bold text-white bg-red-500 px-3 py-1.5 rounded-full">
                          Hemat {discountPercentage}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">
                        Rp {service.basePrice!.toLocaleString('id-ID')}
                      </span>
                    )}
                    <p className="text-gray-500 text-sm mt-2">*DP 50% diawal, pelunasan setelah desain selesai</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{service.revisionLimit}x</div>
                      <div className="text-sm text-gray-600">Revisi</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{service.orderCount}+</div>
                      <div className="text-sm text-gray-600">Pesanan</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">98%</div>
                      <div className="text-sm text-gray-600">Kepuasan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Apa yang Anda Dapatkan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Proses Pengerjaan</h2>
              <div className="space-y-6">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            {service.faq.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Pertanyaan Umum</h2>
                <div className="space-y-6">
                  {service.faq.map((item, idx) => (
                    <div key={idx} className="border-b pb-6 last:border-0">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Pesan Layanan Ini</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Detail Kebutuhan</label>
                    <textarea
                      value={orderData.requirements}
                      onChange={(e) => setOrderData({...orderData, requirements: e.target.value})}
                      className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Jelaskan kebutuhan desain Anda secara detail..."
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      value={orderData.timeline}
                      onChange={(e) => setOrderData({...orderData, timeline: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="standard">Standard ({service.deliveryDays} hari)</option>
                      <option value="express">Express (3 hari) + Rp 500.000</option>
                      <option value="custom">Custom Timeline</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">File Referensi (Opsional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition cursor-pointer">
                      <div className="text-3xl mb-2">📎</div>
                      <p className="text-gray-600 mb-1">Drag & drop file atau klik untuk upload</p>
                      <p className="text-gray-500 text-sm">Max. 10MB per file</p>
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="inline-block mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer">
                        Pilih File
                      </label>
                    </div>
                    {orderData.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{orderData.files.length} file terpilih</p>
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Harga Layanan</span>
                      <span className="font-semibold">
                        {hasDiscount ? (
                          <>
                            <span className="line-through text-gray-500 text-sm mr-2">
                              Rp {service.basePrice!.toLocaleString('id-ID')}
                            </span>
                            <span>Rp {service.discountPrice!.toLocaleString('id-ID')}</span>
                          </>
                        ) : (
                          <span>Rp {service.basePrice!.toLocaleString('id-ID')}</span>
                        )}
                      </span>
                    </div>
                    {orderData.timeline === 'express' && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Express Fee</span>
                        <span className="font-semibold text-red-500">+ Rp 500.000</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total</span>
                        <span className="text-2xl font-bold text-purple-600">
                          Rp {
                            (service.discountPrice || service.basePrice || 0 + 
                            (orderData.timeline === 'express' ? 500000 : 0)
                            ).toLocaleString('id-ID')
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Pesan Sekarang
                  </button>
                </form>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 text-lg">ℹ️</span>
                    <div>
                      <p className="text-sm text-blue-700 font-medium mb-1">Proses setelah pemesanan:</p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>1. Konfirmasi order dalam 1x24 jam</li>
                        <li>2. Pembayaran DP 50% untuk mulai pengerjaan</li>
                        <li>3. Progress update melalui dashboard</li>
                        <li>4. Pelunasan setelah desain selesai</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Layanan Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService.id} service={relatedService} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}