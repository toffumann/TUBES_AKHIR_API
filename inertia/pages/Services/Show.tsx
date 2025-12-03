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

  // Data utama service sesuai model database
  const service = {
    id: 1,
    nama_service: 'Logo Design Professional',
    deskripsi: 'Dapatkan logo yang unik dan memorable untuk brand Anda. Kami akan membuat 3 konsep logo berbeda yang sesuai dengan identitas brand Anda, dilengkapi dengan file vector untuk kebutuhan cetak dan digital.',
    harga: 2500000,
    // Data tambahan untuk UI
    slug: 'logo-design-professional',
    category: {
      name: 'Logo & Branding',
      slug: 'logo-branding'
    },
    deliveryDays: 7,
    revisionLimit: 3,
    orderCount: 42,
    isPopular: true,
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
      nama_service: 'Brand Identity Package',
      slug: 'brand-identity-package',
      deskripsi: 'Paket lengkap identitas merek termasuk logo, warna, tipografi, dan panduan penggunaan',
      harga: 8000000,
      category: { name: 'Branding', slug: 'branding' },
      deliveryDays: 14,
      revisionLimit: 5,
      orderCount: 28,
      isPopular: true,
      features: ['Logo', 'Color palette', 'Typography', 'Brand guidelines']
    },
    {
      id: 3,
      nama_service: 'Social Media Branding',
      slug: 'social-media-branding',
      deskripsi: 'Desain template untuk Instagram, Facebook, dan LinkedIn yang konsisten',
      harga: 3500000,
      category: { name: 'Social Media', slug: 'social-media' },
      deliveryDays: 10,
      revisionLimit: 3,
      orderCount: 56,
      isPopular: false,
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

  return (
    <Layout title={service.nama_service}>
      <Head>
        <title>{service.nama_service} - Desain Aja Dulu</title>
        <meta name="description" content={service.deskripsi} />
      </Head>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b">
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
            <span className="text-gray-900 font-medium">{service.nama_service}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <div className="bg-white rounded-lg border p-6">
              <div className="mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {service.category.name}
                </span>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{service.nama_service}</h1>
              <p className="text-gray-600 mb-6">{service.deskripsi}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.isPopular && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    🔥 POPULAR
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  ⏱️ {service.deliveryDays} hari
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  ✏️ {service.revisionLimit}x revisi
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  📊 {service.orderCount} pesanan
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    Rp {service.harga.toLocaleString('id-ID')}
                  </div>
                  <p className="text-gray-500 text-sm">DP 50% diawal, pelunasan setelah desain selesai</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white border rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{service.revisionLimit}x</div>
                  <div className="text-xs text-gray-600">Revisi</div>
                </div>
                <div className="text-center p-3 bg-white border rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{service.orderCount}+</div>
                  <div className="text-xs text-gray-600">Pesanan</div>
                </div>
                <div className="text-center p-3 bg-white border rounded-lg">
                  <div className="text-lg font-bold text-purple-600">98%</div>
                  <div className="text-xs text-gray-600">Kepuasan</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Apa yang Anda Dapatkan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Proses Pengerjaan</h2>
              <div className="space-y-4">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            {service.faq.length > 0 && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
                <div className="space-y-5">
                  {service.faq.map((item, idx) => (
                    <div key={idx} className="border-b pb-5 last:border-0 last:pb-0">
                      <h3 className="font-medium text-gray-900 mb-1.5">{item.question}</h3>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border p-5">
                <h2 className="text-lg font-bold mb-5">Pesan Layanan Ini</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Detail Kebutuhan</label>
                    <textarea
                      value={orderData.requirements}
                      onChange={(e) => setOrderData({...orderData, requirements: e.target.value})}
                      className="w-full p-3 border rounded-lg h-32 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Jelaskan kebutuhan desain Anda..."
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      value={orderData.timeline}
                      onChange={(e) => setOrderData({...orderData, timeline: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="standard">Standard ({service.deliveryDays} hari)</option>
                      <option value="express">Express (3 hari) + Rp 500.000</option>
                      <option value="custom">Custom Timeline</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">File Referensi (Opsional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition cursor-pointer">
                      <div className="text-2xl mb-2">📎</div>
                      <p className="text-gray-600 text-sm mb-1">Klik untuk upload file</p>
                      <p className="text-gray-500 text-xs">Max. 10MB per file</p>
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="inline-block mt-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 cursor-pointer">
                        Pilih File
                      </label>
                    </div>
                    {orderData.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600">{orderData.files.length} file terpilih</p>
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Harga Layanan</span>
                      <span className="font-semibold">
                        Rp {service.harga.toLocaleString('id-ID')}
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
                        <span className="text-xl font-bold text-purple-600">
                          Rp {
                            (service.harga + 
                            (orderData.timeline === 'express' ? 500000 : 0)
                            ).toLocaleString('id-ID')
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Pesan Sekarang
                  </button>
                </form>

                {/* Info Box */}
                <div className="mt-6 p-3 bg-blue-50 rounded border border-blue-100">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2">ℹ️</span>
                    <div>
                      <p className="text-sm text-blue-700 font-medium mb-1">Proses setelah pemesanan:</p>
                      <ul className="text-xs text-blue-600 space-y-0.5">
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
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Layanan Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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