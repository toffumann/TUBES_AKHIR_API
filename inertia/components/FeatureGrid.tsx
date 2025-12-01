import FeatureCard from './FeatureCard'

interface FeatureItem {
  icon: string
  title: string
  description: string
  bgColor?: string
}

interface FeatureGridProps {
  features: FeatureItem[]
  title?: string
  subtitle?: string
}

export default function FeatureGrid({ 
  features, 
  title = "FITUR UTAMA",
  subtitle = "Semua yang kamu butuhkan untuk mengelola bisnis desainmu"
}: FeatureGridProps) {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-brand-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
            {title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              delay={index * 100}
              {...feature}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="btn-secondary text-sm px-6 py-2">
            
          </button>
        </div>
      </div>
    </section>
  )
}