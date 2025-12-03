import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  ChevronRight,
  CheckCircle,
  Palette,
  Briefcase,
  Heart,
  Eye,
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Data desainer populer
  const popularDesigners = [
    {
      id: 1,
      name: 'Sarah Designer',
      title: 'UI/UX Specialist',
      rating: 4.9,
      projects: 124,
      rate: 'Rp 500.000 - 1.000.000',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      tags: ['UI/UX', 'Web Design', 'Figma']
    },
    {
      id: 2,
      name: 'Budi Illustra',
      title: 'Illustration Expert',
      rating: 4.8,
      projects: 89,
      rate: 'Rp 300.000 - 800.000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      tags: ['Illustration', 'Logo', 'Digital Art']
    },
    {
      id: 3,
      name: 'Maya Branding',
      title: 'Brand Identity Pro',
      rating: 4.7,
      projects: 156,
      rate: 'Rp 750.000 - 1.500.000',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      tags: ['Branding', 'Logo', 'Packaging']
    },
    {
      id: 4,
      name: 'Andi Motion',
      title: 'Motion Designer',
      rating: 4.9,
      projects: 67,
      rate: 'Rp 1.000.000 - 2.000.000',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      tags: ['Motion', 'Animation', 'Video']
    }
  ]

  // Kategori desain
  const categories = [
    { name: 'UI/UX Design', icon: '🎨', count: 245, color: 'from-blue-500 to-cyan-500' },
    { name: 'Logo & Branding', icon: '🏢', count: 189, color: 'from-purple-500 to-pink-500' },
    { name: 'Ilustrasi', icon: '✏️', count: 156, color: 'from-orange-500 to-red-500' },
    { name: 'Motion Design', icon: '🎬', count: 98, color: 'from-green-500 to-emerald-500' },
    { name: 'Web Design', icon: '🌐', count: 210, color: 'from-indigo-500 to-blue-500' },
    { name: 'Packaging', icon: '📦', count: 76, color: 'from-yellow-500 to-orange-500' }
  ]

  // Proses kerja
  const workflows = [
    {
      step: 1,
      title: 'Cari Desainer',
      description: 'Telusuri portfolio dan temukan desainer yang sesuai kebutuhan',
      icon: Search
    },
    {
      step: 2,
      title: 'Diskusikan Proyek',
      description: 'Ajukan brief dan diskusikan detail proyek dengan desainer',
      icon: MessageSquare
    },
    {
      step: 3,
      title: 'Lakukan Pembayaran',
      description: 'Bayar dengan aman melalui sistem escrow kami',
      icon: Shield
    },
    {
      step: 4,
      title: 'Terima Hasil',
      description: 'Dapatkan file desain sesuai kesepakatan',
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head title="Home - DesainHub" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">#1 Platform Desain di Indonesia</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Temukan Desainer <br />
                <span className="text-yellow-300">Berkualitas</span> untuk Proyek Anda
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Hubungkan dengan ribuan desainer profesional untuk logo, UI/UX, branding, dan kebutuhan desain lainnya.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari jasa desain (contoh: logo, UI/UX, branding)"
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Cari Desainer
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">10.000+</div>
                    <div className="text-blue-100">Desainer Aktif</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">50.000+</div>
                    <div className="text-blue-100">Proyek Selesai</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-blue-100">Rating Klien</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-4 rounded-xl">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-sm text-blue-100">Kepuasan Klien</div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm text-blue-100">Dukungan</div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm text-blue-100">Garansi Revisi</div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl">
                    <div className="text-3xl font-bold mb-2">Escrow</div>
                    <div className="text-sm text-blue-100">Pembayaran Aman</div>
                  </div>
                </div>
                
                {/* Hero Image */}
                <div className="mt-8 relative">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Design Collaboration"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">Proyek Aktif</div>
                        <div className="text-2xl font-bold">2.500+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jelajahi Kategori Desain
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan desainer berdasarkan spesialisasi dan keahlian
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300`}>
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                  <div className="text-white/80 text-sm">{category.count} Desainer</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Desainer Populer Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Desainer Populer
              </h2>
              <p className="text-gray-600">
                Desainer terbaik dengan rating tinggi dan banyak proyek berhasil
              </p>
            </div>
            <Link
              href="/designers"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              Lihat Semua <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDesigners.map((designer) => (
              <div
                key={designer.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{designer.name}</h3>
                      <p className="text-gray-600 text-sm">{designer.title}</p>
                    </div>
                    <div className="flex items-center bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-bold">{designer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span>{designer.projects} proyek</span>
                    <div className="mx-2">•</div>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Dalam 24 jam</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {designer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Mulai dari</div>
                      <div className="font-bold text-gray-900">{designer.rate}</div>
                    </div>
                    <Link
                      href={`/designer/${designer.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Lihat Profil <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cara Kerja yang Mudah
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dapatkan desain berkualitas dalam 4 langkah sederhana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflows.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Merealisasikan Ide Desain Anda?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan klien yang telah mempercayakan proyek desain mereka kepada kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/how-it-works"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
            <div className="mt-8 text-blue-100 text-sm">
              Gratis pendaftaran • Tanpa biaya tersembunyi • 100% aman
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Palette className="w-8 h-8 mr-2 text-yellow-400" />
                <span className="text-2xl font-bold">DesainHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                Platform terdepan untuk menghubungkan klien dengan desainer profesional di Indonesia.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Perusahaan</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Karir</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/press" className="text-gray-400 hover:text-white">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Sumber Daya</h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Bantuan</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Syarat & Ketentuan</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Kebijakan Privasi</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
              <p className="text-gray-400 mb-4">
                hello@desainhub.id
              </p>
              <p className="text-gray-400">
                +62 21 1234 5678
              </p>
              <div className="flex space-x-4 mt-6">
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  📘
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  🐦
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  📷
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  ▶️
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DesainHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}