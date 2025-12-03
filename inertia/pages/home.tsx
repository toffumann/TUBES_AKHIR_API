import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import FeatureGrid from '../components/FeatureGrid'
import PortfolioGallery from '../components/PortfolioGallery'
import Footer from '../components/Footer'

export default function HomePage() {
  const heroFeatures = [
    {
      icon: '📱',
      title: 'CHAOTIC',
      description: 'Pesanan berantakan di chat'
    },
    {
      icon: '📝',
      title: 'MESSY',
      description: 'Detail brief tidak jelas'
    },
    {
      icon: '⏰',
      title: 'DELAY',
      description: 'Proyek molor, klien marah'
    }
  ]

  const mainFeatures = [
    {
      icon: '📋',
      title: 'Form Pemesanan Terstruktur',
      description: 'Template brief profesional yang memandu klien memberikan detail lengkap: tujuan, preferensi, deadline, budget.',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '📊',
      title: 'Order Tracking Real-time',
      description: 'Dashboard tracking untuk klien dan desainer. Status: Received → In Progress → Review → Revision → Completed.',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '💬',
      title: 'Komunikasi Terpusat',
      description: 'Semua diskusi, feedback, dan revisi dalam satu thread. Tidak lagi tercecer di chat/WA/IG yang berbeda.',
      bgColor: 'bg-pink-50'
    },
    {
      icon: '📁',
      title: 'File Management Rapi',
      description: 'Upload semua file (brief, referensi, hasil desain, revisi) dalam satu proyek. Version control otomatis.',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: '⏰',
      title: 'Deadline & Reminder Otomatis',
      description: 'Automatic reminder untuk desainer dan klien. Notifikasi progress update dan deadline approaching.',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: '💰',
      title: 'Payment Integration Lengkap',
      description: 'Generate invoice otomatis, terima DP & pelunasan, tracking status pembayaran, payment reminder.',
      bgColor: 'bg-green-50'
    }
  ]

  const testimonials = [
    {
      name: "Rina, Freelance Designer",
      role: "Biasa terima order via Instagram",
      content: "Dulu harus buka 20+ chat di Instagram untuk cari detail brief. Sekarang semua rapi di satu tempat. Klien juga lebih respect!",
      avatar: "👩‍💻",
      improvement: "Waktu turun 70%"
    },
    {
      name: "Studio Kreatif XYZ",
      role: "Menerima 50+ order/bulan",
      content: "Sistem trackingnya bikin klien tidak perlu tanya progress tiap jam. Mereka bisa lihat sendiri di dashboard.",
      avatar: "🏢",
      improvement: "Komunikasi turun 80%"
    },
    {
      name: "Andi, UI/UX Designer",
      role: "Banyak proyek dari luar kota",
      content: "Invoice otomatis dan payment tracking sangat membantu. Tidak ada lagi kasus lupa nagih atau salah hitung.",
      avatar: "👨‍🎨",
      improvement: "Payment delay turun 90%"
    }
  ]

  return (
    <>
      <Head>
        <title>Desain Aja Dulu - Sistem Pemesanan Desain yang Terstruktur</title>
        <meta name="description" content="Platform untuk mengubah pemesanan desain dari chaotic (chat/WA/IG) menjadi terstruktur. Kelola brief, tracking progress, komunikasi, dan invoice dalam satu sistem professional." />
        <meta name="keywords" content="sistem pemesanan desain, order management desain, platform freelancer desain, manajemen proyek desain, invoice desain otomatis" />
      </Head>

      <div className="min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Left Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-medium mb-4">
                    ⚠️ Masalah Umum Desainer
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-display">
                    Stop Kelola Order via
                    <span className="block text-brand-purple mt-2">
                      Chat/WA/IG.
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 mt-4 leading-relaxed">
                    <span className="font-semibold text-red-600">80% desainer</span> masih mengelola pesanan lewat chat yang berantakan. 
                    <span className="font-semibold"> Data tercecer</span>, 
                    <span className="font-semibold"> detail hilang</span>, 
                    <span className="font-semibold"> proyek molor</span>.
                    <br/><br/>
                    <span className="text-brand-purple font-bold">Desain Aja Dulu</span> mengubah proses pemesanan desain dari <span className="font-semibold">chaotic</span> menjadi <span className="font-semibold">terstruktur & professional</span>.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="btn-primary py-3 px-6 text-sm md:text-base">
                    🚀 Coba Gratis 14 Hari
                  </button>
                  <button className="btn-secondary py-3 px-6 text-sm md:text-base">
                    ▶️ Lihat Demo 2 Menit
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-6">
                  {heroFeatures.map((feature, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-xl mb-1">{feature.icon}</div>
                      <p className="font-semibold text-gray-900 text-xs">{feature.title}</p>
                      <p className="text-gray-500 text-xs">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dashboard Preview */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-brand-purple to-brand-pink p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-semibold text-sm">Order Dashboard</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-5">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-brand-purple">8</div>
                        <div className="text-xs text-gray-600">Active Orders</div>
                      </div>
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-brand-pink">3</div>
                        <div className="text-xs text-gray-600">Need Review</div>
                      </div>
                    </div>
                    
                    {/* Order List */}
                    <div className="space-y-2">
                      {[
                        { name: 'Logo Design', status: '✓ Selesai', color: 'bg-green-500' },
                        { name: 'UI Website', status: '⏳ Progress', color: 'bg-yellow-500' },
                        { name: 'Social Media Kit', status: '📝 Review', color: 'bg-blue-500' },
                        { name: 'Brand Identity', status: '💰 Menunggu DP', color: 'bg-gray-500' }
                      ].map((project, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${project.color}`}></div>
                            <span className="text-sm">{project.name}</span>
                          </div>
                          <div className="text-xs text-gray-500">{project.status}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Timeline */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-xs font-semibold mb-2">This Week Progress</div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-purple w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
                Dari Chaos ke Teratur
              </h2>
              <p className="text-gray-600 text-sm md:text-base">Perbandingan cara tradisional vs dengan platform kami</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Before - Traditional */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">😫</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-600">CARA TRADISIONAL</h3>
                    <p className="text-gray-500 text-sm">(Chat/WA/Instagram)</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "📱 Pesanan tersebar di 5+ chat berbeda",
                    "📝 Detail brief lupa/lupa dicatat",
                    "⏰ Deadline tidak jelas/tidak diingat",
                    "💸 Harga nego bolak-balik, no record",
                    "🔍 Klien tanya progress tiap jam",
                    "📄 Revisi tidak terdokumentasi",
                    "🧾 Invoice manual, payment lupa"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2 text-sm">✗</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-semibold text-sm">Hasil: Stress, tidak professional, proyek molor</p>
                </div>
              </div>

              {/* After - With Platform */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">😎</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-600">DENGAN PLATFORM KAMI</h3>
                    <p className="text-gray-500 text-sm">(Desain Aja Dulu)</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "📋 Semua pesanan dalam satu dashboard",
                    "✅ Brief terstruktur dengan template",
                    "📅 Deadline otomatis diingatkan",
                    "💰 Harga fixed, nego tercatat rapi",
                    "📊 Progress update real-time untuk klien",
                    "🔄 Revisi terdokumentasi dengan baik",
                    "🧾 Invoice otomatis + payment tracking"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 text-sm">✓</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-semibold text-sm">Hasil: Professional, klien puas, proyek tepat waktu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <FeatureGrid 
          features={mainFeatures}
          title="Sistem Lengkap untuk Desainer"
          subtitle="Dari terima order sampai invoice, semua otomatis dan terstruktur"
        />

        {/* Portfolio Gallery */}
        <PortfolioGallery />

        {/* How It Works */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
                Cara Kerjanya
              </h2>
              <p className="text-gray-600 text-sm md:text-base">4 langkah sederhana dari pesanan hingga selesai</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: "📝",
                  title: "Klien Isi Form",
                  desc: "Klien mengisi form brief terstruktur dengan detail lengkap"
                },
                {
                  step: "2",
                  icon: "✅",
                  title: "Konfirmasi & DP",
                  desc: "Desainer konfirmasi, kirim invoice DP, proyek mulai"
                },
                {
                  step: "3",
                  icon: "🎨",
                  title: "Kerjakan & Update",
                  desc: "Desainer kerja, update progress, klien bisa kasih feedback"
                },
                {
                  step: "4",
                  icon: "💰",
                  title: "Final & Pelunasan",
                  desc: "Klien approve, kirim file final + invoice pelunasan"
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-pink rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">
                      {step.step}
                    </div>
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <h3 className="font-bold text-base mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-xs">{step.desc}</p>
                  </div>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
                Kata Mereka yang Sudah Pakai
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Desainer dan studio kreatif yang sudah meningkatkan produktivitas mereka
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card hover:border-brand-purple transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic mb-3">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                    <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      +{testimonial.improvement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-brand-purple to-brand-pink text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">
                Siap Tingkatkan Produktivitasmu?
              </h2>
              <p className="text-base md:text-lg mb-6 opacity-90">
                Gabung dengan 500+ desainer yang sudah fokus pada kreativitas, bukan administrasi.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-6">
                <button className="bg-white text-brand-purple px-6 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition shadow-2xl">
                  ✨ Daftar Gratis 14 Hari
                </button>
                <button className="bg-transparent border-2 border-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white/10 transition">
                  📞 Konsultasi Gratis
                </button>
              </div>
              
              <p className="text-xs opacity-80">
                ❤️ Tidak perlu kartu kredit • Cancel anytime • Support 24/7
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}