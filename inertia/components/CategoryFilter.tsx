interface CategoryFilterProps {
  categories: Array<{
    id: number
    name: string
    slug: string
    icon: string
    description?: string
  }>
  selectedCategory?: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Kategori Layanan</h3>
      <div className="flex flex-wrap gap-2">
        <a
          href="/layanan"
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            !selectedCategory 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span>🏠</span>
          <span>Semua Layanan</span>
        </a>
        
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/layanan?category=${category.slug}`}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
              selectedCategory === category.slug
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}