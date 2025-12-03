import { Head } from '@inertiajs/react'
import AdminLayout from '../../../layouts/AdminLayout'
import { useState } from 'react'

interface Service {
  id: number
  name: string
  description: string
  category: {
    name: string
  }
  basePrice?: number
  discountPrice?: number
  deliveryDays: number
  orderCount: number
  isActive: boolean
  isPopular: boolean
  imageUrl?: string
}

export default function AdminServicesIndex() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Logo Design Professional',
      description: 'Desain logo custom dengan 3 konsep berbeda',
      category: { name: 'Logo & Branding' },
      basePrice: 2500000,
      discountPrice: 1999000,
      deliveryDays: 7,
      orderCount: 42,
      isActive: true,
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'UI/UX Mobile App',
      description: 'Desain UI/UX untuk aplikasi mobile',
      category: { name: 'UI/UX Design' },
      basePrice: 8000000,
      deliveryDays: 14,
      orderCount: 28,
      isActive: true,
      isPopular: true
    },
    {
      id: 3,
      name: 'Social Media Kit',
      description: 'Paket desain konten media sosial 1 bulan',
      category: { name: 'Social Media' },
      basePrice: 3000000,
      discountPrice: 2499000,
      deliveryDays: 5,
      orderCount: 56,
      isActive: true,
      isPopular: false
    },
    {
      id: 4,
      name: 'Website Redesign',
      description: 'Modernisasi website existing',
      category: { name: 'Web Design' },
      basePrice: 12000000,
      deliveryDays: 21,
      orderCount: 19,
      isActive: false,
      isPopular: false
    }
  ])

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: '',
    discountPrice: '',
    deliveryDays: '7',
    isActive: true,
    isPopular: false
  })

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  const handleToggleStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ))
  }

  const handleTogglePopular = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isPopular: !service.isPopular } : service
    ))
  }

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...services.map(s => s.id)) + 1
    const service: Service = {
      id: newId,
      name: newService.name,
      description: newService.description,
      category: { name: newService.category },
      basePrice: newService.basePrice ? parseInt(newService.basePrice) : undefined,
      discountPrice: newService.discountPrice ? parseInt(newService.discountPrice) : undefined,
      deliveryDays: parseInt(newService.deliveryDays),
      orderCount: 0,
      isActive: newService.isActive,
      isPopular: newService.isPopular
    }
    setServices([...services, service])
    setNewService({
      name: '',
      description: '',
      category: '',
      basePrice: '',
      discountPrice: '',
      deliveryDays: '7',
      isActive: true,
      isPopular: false
    })
    alert('Layanan berhasil ditambahkan!')
  }

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    popular: services.filter(s => s.isPopular).length,
    totalOrders: services.reduce((sum, s) => sum + s.orderCount, 0)
  }

  return (
    <AdminLayout title="Kelola Layanan">
      <Head>
        <title>Kelola Layanan - Admin</title>
      </Head>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Kelola Layanan</h1>
          <p className="text-gray-600">Tambah, edit, atau hapus layanan yang tersedia</p>
        </div>
        <a
          href="/admin/layanan/buat"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          + Tambah Layanan
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-gray-600">Total Layanan</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.active}</div>
          <div className="text-gray-600">Aktif</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.popular}</div>
          <div className="text-gray-600">Popular</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <div className="text-gray-600">Total Pesanan</div>
        </div>
      </div>

      {/* Add Service Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Tambah Layanan Baru</h2>
        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Layanan</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({...newService, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <select
              value={newService.category}
              onChange={(e) => setNewService({...newService, category: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Logo & Branding">Logo & Branding</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Social Media">Social Media</option>
              <option value="Web Design">Web Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Harga Normal (Rp)</label>
            <input
              type="number"
              value={newService.basePrice}
              onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Harga Diskon (Rp)</label>
            <input
              type="number"
              value={newService.discountPrice}
              onChange={(e) => setNewService({...newService, discountPrice: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hari Pengerjaan</label>
            <input
              type="number"
              value={newService.deliveryDays}
              onChange={(e) => setNewService({...newService, deliveryDays: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newService.isActive}
                onChange={(e) => setNewService({...newService, isActive: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm">Aktif</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newService.isPopular}
                onChange={(e) => setNewService({...newService, isPopular: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm">Popular</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Simpan Layanan
            </button>
          </div>
        </form>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pesanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200 mr-3 overflow-hidden">
                        {service.imageUrl ? (
                          <img src={service.imageUrl} alt={service.name} className="h-10 w-10 object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">🎨</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      {service.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {service.discountPrice ? (
                      <div>
                        <div className="font-medium">Rp {service.discountPrice.toLocaleString('id-ID')}</div>
                        <div className="text-sm text-gray-500 line-through">
                          Rp {service.basePrice?.toLocaleString('id-ID')}
                        </div>
                      </div>
                    ) : (
                      <div className="font-medium">
                        {service.basePrice 
                          ? `Rp ${service.basePrice.toLocaleString('id-ID')}` 
                          : 'Custom'
                        }
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(service.id)}
                        className={`w-10 h-6 rounded-full transition ${service.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transform transition ${service.isActive ? 'translate-x-5' : 'translate-x-1'}`}></div>
                      </button>
                      <span>{service.isActive ? 'Aktif' : 'Nonaktif'}</span>
                      <button
                        onClick={() => handleTogglePopular(service.id)}
                        className={`px-2 py-1 text-xs rounded-full ${service.isPopular ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {service.isPopular ? 'Popular' : 'Biasa'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{service.orderCount}</div>
                    <div className="text-sm text-gray-500">{service.deliveryDays} hari</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Services */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Belum ada layanan</h3>
          <p className="text-gray-600">Tambahkan layanan pertama Anda menggunakan form di atas</p>
        </div>
      )}
    </AdminLayout>
  )
}