export interface FeatureCardProps {
  icon: string
  title: string
  description: string
  bgColor?: string
  index?: number
}

export interface FeatureItem extends FeatureCardProps {}

export interface FeatureGridProps {
  features: FeatureItem[]
  title?: string
  subtitle?: string
}