interface ServiceCardProps {
  service: {
    id: number
    nama_service: string
    deskripsi: string | null
    harga: number
    slug?: string
    category?: {
      name: string
      slug: string
    }
    deliveryDays?: number
    revisionLimit?: number
    orderCount?: number
    isPopular?: boolean
    features?: string[]
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // URL untuk detail service
  const serviceUrl = service.slug 
    ? `/layanan/${service.slug}` 
    : `/layanan/${service.id}`

  return (
    <div className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {service.isPopular && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          🔥 POPULAR
        </div>
      )}

      {/* Header dengan icon dan kategori */}
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">🎨</span>
            </div>
            <div>
              {service.category && (
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {service.category.name}
                </span>
              )}
            </div>
          </div>
          {service.deliveryDays && (
            <span className="text-xs text-gray-500 flex items-center">
              <span className="mr-1">⏱️</span>
              {service.deliveryDays} hari
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {service.nama_service}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.deskripsi || 'Desain profesional berkualitas tinggi'}
        </p>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                <span className="truncate">{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-xs text-gray-500">+{service.features.length - 3} fitur lainnya</li>
            )}
          </ul>
        )}
      </div>

      {/* Footer dengan harga dan button */}
      <div className="border-t bg-gray-50 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-gray-900 block">
              Rp {service.harga.toLocaleString('id-ID')}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              {service.revisionLimit ? `Revisi ${service.revisionLimit}x` : ''}
              {service.revisionLimit && service.orderCount ? ' • ' : ''}
              {service.orderCount ? `${service.orderCount} pesanan` : ''}
            </div>
          </div>
        </div>

        <a
          href={serviceUrl}
          className="block w-full bg-purple-600 text-white text-center py-2.5 rounded font-medium hover:bg-purple-700 transition-colors"
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  )
}