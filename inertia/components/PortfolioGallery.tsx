interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  designer: string
  completionDate: string
}

export default function PortfolioGallery() {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Brand Identity - Kopi Kenangan",
      category: "Branding",
      description: "Logo, packaging, dan brand guideline untuk kedai kopi lokal",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop",
      designer: "Studio Kreatif XYZ",
      completionDate: "Jan 2024"
    },
    {
      id: 2,
      title: "UI/UX Mobile App - Fintech",
      category: "UI/UX Design",
      description: "Dashboard mobile banking dengan user experience yang intuitif",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w-800&h=600&fit=crop",
      designer: "Sarah Wijaya",
      completionDate: "Des 2023"
    },
    {
      id: 3,
      title: "Social Media Kit - Beauty Brand",
      category: "Social Media",
      description: "Template Instagram feed, story, dan campaign visual",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w-800&h=600&fit=crop",
      designer: "Maya Putri",
      completionDate: "Nov 2023"
    },
    {
      id: 4,
      title: "Website Redesign - E-commerce",
      category: "Web Design",
      description: "Modernisasi UI website toko online dengan conversion optimization",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w-800&h=600&fit=crop",
      designer: "Budi Santoso",
      completionDate: "Okt 2023"
    },
    {
      id: 5,
      title: "Packaging Design - Food Product",
      category: "Packaging",
      description: "Desain kemasan makanan organik dengan sustainable materials",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w-800&h=600&fit=crop",
      designer: "Andi Creative",
      completionDate: "Sep 2023"
    },
    {
      id: 6,
      title: "Illustration Series - EduTech",
      category: "Illustration",
      description: "Set karakter ilustrasi untuk platform pembelajaran anak",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w-800&h=600&fit=crop",
      designer: "Creative Studio ID",
      completionDate: "Agu 2023"
    }
  ]

  const categories = ["All", "Branding", "UI/UX Design", "Web Design", "Social Media", "Packaging", "Illustration"]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium mb-4">
            🎨 PORTFOLIO KAMI
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
            Project yang Sudah Selesai
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Hasil kolaborasi desainer dan klien melalui platform kami
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "All" 
                  ? "bg-brand-purple text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group card overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <div 
                  className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm mb-4">{item.description}</p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      {item.designer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{item.designer}</p>
                      <p className="text-xs text-gray-500">Desainer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900">Selesai</p>
                    <p className="text-xs text-gray-500">{item.completionDate}</p>
                  </div>
                </div>

                {/* Process Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-gray-600">
                      <span className="font-medium">Proses:</span> 2 minggu
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Revisi:</span> 3x
                    </div>
                    <div className="text-green-600 font-medium">
                      ✓ Klien Puas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Project Selesai" },
              { value: "98%", label: "Kepuasan Klien" },
              { value: "200+", label: "Desainer Aktif" },
              { value: "2-3x", label: "Lebih Cepat" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl md:text-3xl font-bold text-brand-purple mb-1">{stat.value}</div>
                <div className="text-gray-600 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm mb-4">Ingin project Anda tampil di sini?</p>
          <button className="btn-primary px-8 py-3">
            🚀 Mulai Project Desain
          </button>
        </div>
      </div>
    </section>
  )
}