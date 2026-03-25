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
  const { data: animals = [] } = useAnimals()
  const { data: foundations = [] } = useFoundations()

  const urgentAnimals = animals.filter((a) => a.isUrgent)
  const featuredAnimals = animals.slice(0, 3)

  return (
    <PageWrapper>
      <HeroSection stats={HERO_STATS} />
      <UrgentCasesSection animals={urgentAnimals} />
      <AnimalsSection animals={animals} />
      <FoundationsSection foundations={foundations} />
      <HowToHelpSection featuredAnimals={featuredAnimals} />
      <Footer />
    </PageWrapper>
  )
}
