import { PageWrapper } from '@/components/shared'
import { Footer } from '@/components/layout'
import { useAnimals } from '@/features/animals/hooks/useAnimals'
import { useFoundations } from '@/features/foundations/hooks/useFoundations'
import { HeroSection } from './sections/HeroSection'
import { UrgentCasesSection } from './sections/UrgentCasesSection'
import { AnimalsSection } from './sections/AnimalsSection'
import { FoundationsSection } from './sections/FoundationsSection'
import { HowToHelpSection } from './sections/HowToHelpSection'

const HERO_STATS = { adoptions: 347, foundations: 23, waiting: 127 }

export function HomePage() {
  // Para UrgentCasesSection y HowToHelpSection necesitamos los animales
  const { data: animalsResponse } = useAnimals()
  const { data: foundationsResponse } = useFoundations()

  const animals = animalsResponse?.data ?? []
  const foundations = foundationsResponse?.data ?? []

  const urgentAnimals = animals.filter((a) => a.isUrgent)
  const featuredAnimals = animals.slice(0, 3)

  return (
    <PageWrapper>
      <HeroSection stats={HERO_STATS} />
      <UrgentCasesSection animals={urgentAnimals} />
      {/* AnimalsSection maneja sus propios filtros y hace su propio fetch */}
      <AnimalsSection />
      <FoundationsSection foundations={foundations} />
      <HowToHelpSection featuredAnimals={featuredAnimals} />
      <Footer />
    </PageWrapper>
  )
}
