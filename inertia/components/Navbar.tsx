import { Link } from '@inertiajs/react'

export default function Navbar() {
  const menuItems = [
    { label: 'Fitur', href: '/fitur' },
    { label: 'Layanan', href: '/layanan' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-r from-brand-purple to-brand-pink rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 font-display">
                Desain<span className="text-brand-purple">AjaDulu</span>
              </span>
              <p className="text-xs text-gray-500 hidden sm:block">Sistem Pemesanan Desain Professional</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-brand-purple font-medium transition-colors duration-200 text-sm"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 ml-6">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-brand-purple font-medium text-sm"
              >
                Masuk
              </Link>
              <button className="btn-primary text-sm px-5 py-2">
                Daftar
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden mt-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={`mobile-${item.label}`}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-brand-purple text-sm"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t space-y-2">
            <Link href="/login" className="block py-2 text-gray-700 text-sm">Masuk</Link>
            <button className="btn-primary w-full text-sm py-2">Daftar Gratis</button>
          </div>
        </div>
      </div>
    </nav>
  )
}