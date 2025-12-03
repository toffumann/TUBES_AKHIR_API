export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">DesainAjaDulu</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-1">
          <a
            href="/admin/dashboard"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/layanan"
            className="flex items-center space-x-3 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg"
          >
            <span>🎨</span>
            <span>Layanan</span>
          </a>
          <a
            href="/admin/pesanan"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
          >
            <span>📋</span>
            <span>Pesanan</span>
          </a>
          <a
            href="/admin/klien"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
          >
            <span>👥</span>
            <span>Klien</span>
          </a>
          <a
            href="/admin/desainer"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
          >
            <span>👨‍🎨</span>
            <span>Desainer</span>
          </a>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <a
            href="/"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <span>🏠</span>
            <span>Kembali ke Website</span>
          </a>
        </div>
      </div>
    </aside>
  )
}