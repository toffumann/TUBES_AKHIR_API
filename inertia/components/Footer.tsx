import { Link } from '@inertiajs/react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-brand-purple to-brand-pink rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display">
                  Desain<span className="text-brand-purple">AjaDulu</span>
                </h3>
                <p className="text-xs text-gray-400">Sistem Pemesanan Desain</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Platform untuk mengubah pemesanan desain dari chaotic menjadi terstruktur dan professional.
            </p>
            <div className="flex space-x-3">
              {['📘', '🐦', '📸', '💼'].map((icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-purple transition text-sm"
                  aria-label="Social media"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Produk */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-display">PRODUK</h4>
            <ul className="space-y-2">
              {['Fitur', 'Portfolio', 'Harga', 'Tutorial', 'API'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-display">PERUSAHAAN</h4>
            <ul className="space-y-2">
              {['Tentang Kami', 'Karir', 'Blog', 'Press Kit', 'Partner'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-display">KONTAK</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-brand-purple text-sm">📍</span>
                <span className="text-gray-400 text-sm">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-brand-purple text-sm">📧</span>
                <a href="mailto:hello@desainajadulu.com" className="text-gray-400 hover:text-white text-sm">
                  hello@desainajadulu.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-brand-purple text-sm">📞</span>
                <a href="tel:+6281234567890" className="text-gray-400 hover:text-white text-sm">
                  +62 812 3456 7890
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} DesainAjaDulu. Hak cipta dilindungi.
          </p>
          
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-xs">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-xs">
              Syarat Layanan
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-xs">
              Preferensi Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}