interface ServiceCardProps {
  service: {
    id: number
    name: string
    slug: string
    description: string
    category: {
      name: string
      slug: string
    }
    basePrice?: number
    discountPrice?: number
    deliveryDays: number
    revisionLimit: number
    orderCount: number
    isPopular: boolean
    imageUrl?: string
    features: string[]
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const displayPrice = service.discountPrice || service.basePrice
  const hasDiscount = service.discountPrice && service.basePrice && service.discountPrice < service.basePrice
  const discountPercentage = hasDiscount && service.basePrice 
    ? Math.round((1 - service.discountPrice! / service.basePrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
      {service.isPopular && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
          🔥 POPULAR
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {service.imageUrl ? (
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl opacity-20 group-hover:scale-110 transition-transform duration-500">🎨</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {service.category.name}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <span className="mr-1">⏱️</span>
            {service.deliveryDays} hari
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {service.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <ul className="space-y-1.5 mb-6">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <span className="text-green-500 mr-2 text-xs">✓</span>
              <span className="truncate">{feature}</span>
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="text-xs text-gray-500">+{service.features.length - 3} fitur lainnya</li>
          )}
        </ul>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              {displayPrice ? (
                <>
                  {hasDiscount ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        Rp {service.discountPrice!.toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        Rp {service.basePrice!.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded ml-2">
                        -{discountPercentage}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      Rp {service.basePrice!.toLocaleString('id-ID')}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-lg font-bold text-purple-600">Custom Price</span>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Revisi {service.revisionLimit}x • {service.orderCount} pesanan
              </div>
            </div>
          </div>

          <a
            href={`/layanan/${service.slug}`}
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </div>
  )
}