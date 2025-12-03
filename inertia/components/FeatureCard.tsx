interface FeatureCardProps {
  icon: string
  title: string
  description: string
  bgColor?: string
  delay?: number
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  bgColor = 'bg-purple-50',
  delay = 0
}: FeatureCardProps) {
  return (
    <div 
      className={`${bgColor} card hover:-translate-y-2 transition-all duration-300 border border-gray-100`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-3 text-gray-900 font-display">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <a href="#" className="text-brand-purple font-medium text-xs hover:underline">
          Pelajari lebih lanjut →
        </a>
      </div>
    </div>
  )
}