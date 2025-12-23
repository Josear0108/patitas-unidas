# Bulletproof React Architecture Guide

## Tabla de Contenidos
- [Introducción](#introducción)
- [Principios Fundamentales](#principios-fundamentales)
- [Estructura de Features](#estructura-de-features)
- [Organización de Archivos](#organización-de-archivos)
- [Barrel Exports](#barrel-exports)
- [Import Rules](#import-rules)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [Patterns y Best Practices](#patterns-y-best-practices)
- [FAQ](#faq)

---

## Introducción

### ¿Qué es Bulletproof React?

**Bulletproof React** es una arquitectura escalable y mantenible para aplicaciones React, basada en organización por **features** en lugar de por tipo de archivo.

### Filosofía

```
Traditional (BAD):              Bulletproof (GOOD):
/components                     /features
  - Header.tsx                    /animals
  - Footer.tsx                      /components
  - AnimalCard.tsx                    - AnimalCard.tsx
  - FoundationCard.tsx                - AnimalModal.tsx
/pages                              /routes
  - Home.tsx                          - Adopta.tsx
  - Adopta.tsx                      /api
  - Foundations.tsx                   - animals.ts
/services                           /types
  - animalService.ts                  - animal.ts
  - foundationService.ts            index.ts
/types                            /foundations
  - animal.ts                       /components
  - foundation.ts                     - FoundationCard.tsx
                                    /routes
❌ Archivos relacionados            - Foundations.tsx
   dispersos                        /api
❌ Difícil encontrar                  - foundations.ts
   qué pertenece a qué              index.ts
❌ Imports largos
❌ Acoplamiento oculto           ✅ Todo relacionado junto
                                 ✅ Fácil de encontrar
                                 ✅ Imports simples
                                 ✅ Bajo acoplamiento
```

### Beneficios Clave

1. **Escalabilidad** - Fácil agregar/remover features completas
2. **Mantenibilidad** - Todo relacionado está junto
3. **Clarity** - Estructura clara y predecible
4. **Encapsulación** - Features independientes
5. **Team Collaboration** - Menos conflictos de merge
6. **Testing** - Testing por feature más fácil

---

## Principios Fundamentales

### 1. Feature-First Organization

```
✅ Organizar por DOMINIO DE NEGOCIO (feature)
❌ NO organizar por tipo de archivo técnico

Ejemplo:
✅ features/animals/components/AnimalCard.tsx
❌ components/AnimalCard.tsx
```

### 2. Colocation

```
Principio: "Poner los archivos que cambian juntos, juntos"

Ejemplo:
features/animals/
  ├── components/
  │   ├── AnimalCard.tsx
  │   └── AnimalCard.css        ← CSS junto al componente
  ├── routes/
  │   └── Adopta.tsx
  └── index.ts
```

### 3. Single Source of Export

```
Principio: "Exportar desde un solo punto (barrel export)"

✅ GOOD:
import { AnimalCard } from '@/features/animals'

❌ BAD:
import AnimalCard from '@/features/animals/components/AnimalCard'
```

### 4. Clear Dependencies

```
Principio: "Las dependencias deben ser explícitas y unidireccionales"

✅ GOOD:
features/animals → features/foundations (OK)
features/foundations → (ninguna)

❌ BAD:
features/animals ↔ features/foundations (circular!)
```

### 5. Shared vs Feature-Specific

```
Regla de oro:
- Si se usa en 1 feature → va en esa feature
- Si se usa en 2 features → evaluar (¿extraer a shared?)
- Si se usa en 3+ features → va en shared
```

---

## Estructura de Features

### Anatomía de una Feature

```
features/[feature-name]/
├── api/                  # API calls y servicios externos
│   └── [feature].ts      # Lógica de comunicación con backend
├── components/           # Componentes específicos de la feature
│   ├── Component1.tsx
│   ├── Component1.css    # Estilos collocated (opcional)
│   └── Component2.tsx
├── hooks/                # Hooks específicos de la feature (opcional)
│   └── useFeatureHook.ts
├── routes/               # Componentes de página/ruta
│   └── FeaturePage.tsx
├── types/                # TypeScript types/interfaces
│   └── [feature].ts
├── utils/                # Utilidades específicas (opcional)
│   └── helpers.ts
├── styles/               # Estilos de la feature
│   └── Feature.css
├── constants/            # Constantes de la feature (opcional)
│   └── constants.ts
└── index.ts              # Barrel export (OBLIGATORIO)
```

### Directorios Opcionales vs Obligatorios

**Siempre crear:**
- ✅ `index.ts` - Barrel export

**Crear solo si necesitas:**
- ⚠️ `api/` - Si la feature hace llamadas a backend
- ⚠️ `components/` - Si tiene componentes reutilizables dentro de la feature
- ⚠️ `routes/` - Si tiene páginas/rutas
- ⚠️ `types/` - Si tiene tipos TypeScript específicos
- ⚠️ `hooks/` - Si tiene custom hooks
- ⚠️ `styles/` - Si tiene estilos separados
- ⚠️ `utils/` - Si tiene funciones helper
- ⚠️ `constants/` - Si tiene constantes

**Regla:** No crear carpetas vacías "por si acaso"

---

## Organización de Archivos

### Ejemplo: Feature "animals"

```typescript
// ============================================
// features/animals/index.ts (Barrel Export)
// ============================================
// Components
export { default as AnimalCard } from './components/AnimalCard';
export { default as AnimalDetailModal } from './components/AnimalDetailModal';

// Routes
export { default as Adopta } from './routes/Adopta';

// API
export { animalService } from './api/animals';
export * from './api/animals'; // Re-export named exports

// Types
export type { Animal, AnimalData } from './types/animal';

// ============================================
// features/animals/api/animals.ts
// ============================================
import { apiCall } from '@/config/api';
import type { Animal, AnimalData } from '../types/animal';

export const animalService = {
  getAnimales: async (): Promise<Animal[]> => {
    return await apiCall<Animal[]>('/animals');
  },

  getAnimalById: async (id: number): Promise<AnimalData> => {
    return await apiCall<AnimalData>(`/animals/${id}`);
  },
};

// ============================================
// features/animals/types/animal.ts
// ============================================
import type { Foundation } from '@/features/foundations';

export interface Animal {
  id: number;
  name: string;
  type: string;
  // ...
}

export interface AnimalData extends Animal {
  foundation?: Foundation;
  // ...
}

// ============================================
// features/animals/components/AnimalCard.tsx
// ============================================
import type { AnimalData } from '../types/animal';
import '../styles/AnimalCard.css'; // Relative import for styles

interface AnimalCardProps {
  animal: AnimalData;
  onSelect: () => void;
}

export default function AnimalCard({ animal, onSelect }: AnimalCardProps) {
  return (
    <div className="animal-card" onClick={onSelect}>
      <h3>{animal.name}</h3>
    </div>
  );
}

// ============================================
// features/animals/routes/Adopta.tsx
// ============================================
import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components';
import { AnimalCard, AnimalDetailModal, animalService } from '@/features/animals';
import type { AnimalData } from '@/features/animals';

export default function Adopta() {
  const [animals, setAnimals] = useState<AnimalData[]>([]);

  useEffect(() => {
    animalService.getAnimales().then(setAnimals);
  }, []);

  return (
    <>
      <Header />
      <main>
        {animals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </main>
      <Footer />
    </>
  );
}
```

### Ejemplo: Feature con Hooks

```typescript
// ============================================
// features/animals/hooks/useAnimalModal.ts
// ============================================
import { useState, useCallback } from 'react';
import type { AnimalData } from '../types/animal';

export function useAnimalModal() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalData | null>(null);

  const openModal = useCallback((animal: AnimalData) => {
    setSelectedAnimal(animal);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedAnimal(null);
  }, []);

  return {
    selectedAnimal,
    openModal,
    closeModal,
    isOpen: selectedAnimal !== null,
  };
}

// ============================================
// features/animals/index.ts
// ============================================
// ... otros exports ...
export { useAnimalModal } from './hooks/useAnimalModal';

// ============================================
// Uso en componente
// ============================================
import { useAnimalModal } from '@/features/animals';

function MyComponent() {
  const { selectedAnimal, openModal, closeModal } = useAnimalModal();
  // ...
}
```

---

## Barrel Exports

### ¿Qué es un Barrel Export?

Un **barrel export** es un archivo `index.ts` que re-exporta las partes públicas de una feature, creando una API limpia.

### Template de index.ts

```typescript
// features/[feature-name]/index.ts

// ============================================
// PUBLIC API - EXPORTS
// ============================================

// Components
export { default as ComponentName } from './components/ComponentName';

// Routes
export { default as RouteName } from './routes/RouteName';

// API / Services
export { featureService } from './api/feature';
export * from './api/feature'; // Si hay named exports adicionales

// Hooks
export { useFeatureHook } from './hooks/useFeatureHook';

// Types
export type { TypeName } from './types/feature';

// Constants (si aplica)
export { CONSTANT_NAME } from './constants/constants';

// ============================================
// INTERNAL - NO EXPORTS
// ============================================
// Archivos que NO se exportan:
// - utils/ (solo para uso interno de la feature)
// - Componentes internos que no se usan fuera de la feature
// - Helpers privados
```

### Reglas de Barrel Exports

1. **Solo exportar lo público**
   ```typescript
   ✅ Export: Componentes usados fuera de la feature
   ✅ Export: Routes
   ✅ Export: API services
   ✅ Export: Types públicos

   ❌ NO export: Componentes internos
   ❌ NO export: Utilidades privadas
   ❌ NO export: Types internos
   ```

2. **Named exports vs Default exports**
   ```typescript
   // Component file:
   export default function AnimalCard() { ... }

   // Barrel export:
   export { default as AnimalCard } from './components/AnimalCard';

   // Usage:
   import { AnimalCard } from '@/features/animals';
   ```

3. **Re-export types**
   ```typescript
   // Barrel export:
   export type { Animal, AnimalData } from './types/animal';

   // Usage:
   import type { Animal } from '@/features/animals';
   ```

---

## Import Rules

### Reglas de Importación

```typescript
// ============================================
// 1. IMPORTS EXTERNOS (npm packages)
// ============================================
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// 2. IMPORTS DE OTRAS FEATURES (absolute)
// ============================================
import { Foundation } from '@/features/foundations';
import { Header, Footer } from '@/components';
import { useLockBodyScroll } from '@/hooks';

// ============================================
// 3. IMPORTS INTERNOS DE LA FEATURE (relative)
// ============================================
import { animalService } from '../api/animals';
import type { AnimalData } from '../types/animal';
import '../styles/AnimalCard.css';

// ============================================
// 4. IMPORTS DE ASSETS (relative)
// ============================================
import logo from '../assets/logo.png';
```

### Allowed vs Forbidden Imports

```typescript
// ============================================
// ✅ ALLOWED
// ============================================
// Desde cualquier feature:
import { SomeComponent } from '@/features/other-feature'; // OK via barrel
import { sharedUtil } from '@/lib'; // OK (shared)
import { Header } from '@/components'; // OK (shared)

// Dentro de la misma feature:
import { localUtil } from '../utils/helpers'; // OK (interno)
import type { LocalType } from '../types/feature'; // OK (interno)

// ============================================
// ❌ FORBIDDEN
// ============================================
// NO importar directamente archivos internos de otras features:
import Component from '@/features/other-feature/components/Component'; // ❌
import { helper } from '@/features/other-feature/utils/helper'; // ❌

// NO imports circulares:
// features/animals imports features/foundations ✅
// features/foundations imports features/animals ❌
```

### Path Aliases Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@config': path.resolve(__dirname, './src/config'),
      '@lib': path.resolve(__dirname, './src/lib'),
    }
  }
});

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@features/*": ["./src/features/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@config/*": ["./src/config/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

---

## Ejemplos Prácticos

### Caso 1: Crear Nueva Feature desde Cero

```bash
# 1. Crear estructura
mkdir -p src/features/search/{api,components,routes,types,styles}

# 2. Crear barrel export
cat > src/features/search/index.ts << 'EOF'
export { default as SearchPage } from './routes/SearchPage';
export { searchService } from './api/search';
export type { SearchResult } from './types/search';
EOF

# 3. Crear types
cat > src/features/search/types/search.ts << 'EOF'
export interface SearchResult {
  id: number;
  title: string;
  description: string;
}
EOF

# 4. Crear API service
cat > src/features/search/api/search.ts << 'EOF'
import { apiCall } from '@/config/api';
import type { SearchResult } from '../types/search';

export const searchService = {
  search: async (query: string): Promise<SearchResult[]> => {
    return await apiCall<SearchResult[]>(`/search?q=${query}`);
  }
};
EOF

# 5. Crear route component
cat > src/features/search/routes/SearchPage.tsx << 'EOF'
import { useState } from 'react';
import { searchService } from '../api/search';
import type { SearchResult } from '../types/search';

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    const data = await searchService.search(query);
    setResults(data);
  };

  return <div>Search Page</div>;
}
EOF

# 6. Agregar ruta en App.tsx
# import { SearchPage } from '@/features/search';
# <Route path="/search" element={<SearchPage />} />
```

### Caso 2: Compartir Componente Entre Features

```typescript
// ============================================
// Opción A: Si se usa en 2 features específicas
// ============================================
// Dejar en la feature principal y exportar

// features/animals/components/Badge.tsx
export default function Badge({ label }: { label: string }) {
  return <span className="badge">{label}</span>;
}

// features/animals/index.ts
export { default as Badge } from './components/Badge';

// features/foundations puede usar:
import { Badge } from '@/features/animals';

// ============================================
// Opción B: Si se usa en 3+ features
// ============================================
// Mover a shared components

// components/ui/Badge.tsx
export default function Badge({ label }: { label: string }) {
  return <span className="badge">{label}</span>;
}

// components/ui/index.ts
export { default as Badge } from './Badge';

// components/index.ts
export * from './ui';

// Cualquier feature puede usar:
import { Badge } from '@/components';
```

### Caso 3: Cross-Feature Types

```typescript
// ============================================
// Problema: Animal necesita Foundation type
// ============================================

// features/foundations/types/foundation.ts
export interface Foundation {
  id: number;
  name: string;
}

// features/foundations/index.ts
export type { Foundation } from './types/foundation';

// features/animals/types/animal.ts
import type { Foundation } from '@/features/foundations';

export interface AnimalData {
  id: number;
  name: string;
  foundation?: Foundation; // ✅ OK - import desde barrel export
}

// ❌ NUNCA hacer:
// import type { Foundation } from '@/features/foundations/types/foundation';
```

### Caso 4: Estilos Compartidos vs Feature-Specific

```css
/* ============================================
   GLOBAL STYLES (src/styles/global.css)
   ============================================ */
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
}

.button { /* Global button styles */ }
.card { /* Global card styles */ }

/* ============================================
   FEATURE STYLES (features/animals/styles/Adopta.css)
   ============================================ */
.adopta-hero {
  /* Feature-specific styles */
}

.animals-grid {
  /* Feature-specific styles */
}

/* ============================================
   COMPONENT STYLES (features/animals/components/AnimalCard.css)
   ============================================ */
.animal-card {
  /* Component-specific styles */
}
```

---

## Patterns y Best Practices

### Pattern 1: Service Layer

```typescript
// features/animals/api/animals.ts
import { apiCall } from '@/config/api';
import type { Animal, AnimalData } from '../types/animal';

// Fallback data (mock)
const MOCK_ANIMALS: Animal[] = [/* ... */];

export const animalService = {
  /**
   * Obtiene todos los animales
   */
  getAnimales: async (): Promise<Animal[]> => {
    try {
      return await apiCall<Animal[]>('/animals');
    } catch (error) {
      console.error('Error fetching animals:', error);
      return MOCK_ANIMALS; // Fallback
    }
  },

  /**
   * Obtiene un animal por ID
   */
  getAnimalById: async (id: number): Promise<AnimalData> => {
    try {
      return await apiCall<AnimalData>(`/animals/${id}`);
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      throw new Error('Animal not found');
    }
  },
};
```

### Pattern 2: Custom Hooks para Lógica Reutilizable

```typescript
// features/animals/hooks/useAnimals.ts
import { useState, useEffect } from 'react';
import { animalService } from '../api/animals';
import type { Animal } from '../types/animal';

export function useAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const data = await animalService.getAnimales();
        if (mounted) {
          setAnimals(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAnimals();

    return () => {
      mounted = false;
    };
  }, []);

  return { animals, loading, error };
}

// Uso:
import { useAnimals } from '@/features/animals';

function MyComponent() {
  const { animals, loading, error } = useAnimals();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* render animals */}</div>;
}
```

### Pattern 3: Route Components Limpios

```typescript
// features/animals/routes/Adopta.tsx
import { Header, Footer } from '@/components';
import { AnimalList } from '../components/AnimalList';
import { useAnimals } from '../hooks/useAnimals';
import '../styles/Adopta.css';

export default function Adopta() {
  const { animals, loading, error } = useAnimals();

  return (
    <div className="page-container">
      <Header />
      <main className="adopta-main">
        <AnimalList
          animals={animals}
          loading={loading}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
}
```

### Pattern 4: Type Inference y Guards

```typescript
// features/animals/types/animal.ts
export interface Animal {
  id: number;
  name: string;
  type: 'Perro' | 'Gato'; // Union type
}

export interface AnimalData extends Animal {
  foundation?: Foundation;
  specialNeeds?: boolean;
}

// Type guards
export function isApadrinable(animal: AnimalData): boolean {
  return animal.specialNeeds === true || animal.state === 'Necesita ayuda';
}

export function isDog(animal: Animal): animal is Animal & { type: 'Perro' } {
  return animal.type === 'Perro';
}

// Uso:
const animal: AnimalData = getAnimal();

if (isApadrinable(animal)) {
  // TypeScript sabe que animal cumple condiciones
}

if (isDog(animal)) {
  // TypeScript sabe que animal.type === 'Perro'
}
```

---

## FAQ

### ¿Cuándo crear una nueva feature?

**Criterios para nueva feature:**
- ✅ Tiene su propia ruta/página
- ✅ Representa un dominio de negocio claro
- ✅ Tiene lógica y componentes específicos
- ✅ Puede existir independientemente

**Ejemplos:**
- ✅ `features/animals` - Dominio claro
- ✅ `features/foundations` - Dominio claro
- ❌ `features/buttons` - Muy genérico, va en `components/ui`
- ❌ `features/utils` - No es dominio de negocio

### ¿Qué va en shared vs feature?

```
Shared (components/, hooks/, lib/):
- Componentes UI genéricos (Button, Input, Modal)
- Layout components (Header, Footer)
- Hooks genéricos (useLocalStorage, useFetch)
- Utilidades genéricas (formatDate, formatCurrency)

Feature-specific:
- Componentes de negocio (AnimalCard, FoundationCard)
- Hooks de dominio (useAnimals, useFoundations)
- Lógica de negocio (isApadrinable, calculateDonation)
- Types de dominio (Animal, Foundation)
```

### ¿Puedo tener subcarpetas en components/?

```
✅ SI es necesario para organización:
features/animals/components/
  ├── cards/
  │   ├── AnimalCard.tsx
  │   └── AnimalCardSkeleton.tsx
  ├── modals/
  │   ├── AnimalDetailModal.tsx
  │   └── AnimalShareModal.tsx
  └── filters/
      └── AnimalFilters.tsx

Barrel export ajustado:
export { AnimalCard } from './components/cards/AnimalCard';
export { AnimalDetailModal } from './components/modals/AnimalDetailModal';
```

### ¿Cómo testear features?

```typescript
// features/animals/__tests__/AnimalCard.test.tsx
import { render, screen } from '@testing-library/react';
import { AnimalCard } from '../components/AnimalCard';

describe('AnimalCard', () => {
  it('renders animal name', () => {
    const animal = { id: 1, name: 'Max', type: 'Perro' };
    render(<AnimalCard animal={animal} onSelect={() => {}} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
  });
});

// Estructura de tests:
features/animals/
  ├── __tests__/
  │   ├── AnimalCard.test.tsx
  │   ├── useAnimals.test.ts
  │   └── animalService.test.ts
  ├── components/
  ├── hooks/
  └── api/
```

### ¿Qué hacer con código legacy durante migración?

```
Durante la migración (COEXISTENCIA):
src/
  ├── components/          ← Legacy (se irá borrando)
  │   ├── Header.tsx
  │   └── AnimalCard.tsx   ← Se migrará
  ├── features/            ← Nueva estructura
  │   └── animals/
  │       └── components/
  │           └── AnimalCard.tsx  ← Ya migrado
  └── pages/               ← Legacy (se irá borrando)

✅ Permitir coexistencia temporal
✅ Actualizar imports gradualmente
✅ Borrar archivos legacy después de migrar
```

### ¿Cómo manejar assets (imágenes, etc.)?

```
Opción 1: Assets compartidos (recomendado):
src/assets/
  ├── images/
  │   └── logo.png
  └── icons/
      └── heart.svg

Uso:
import logo from '@/assets/images/logo.png';

Opción 2: Assets por feature (si son específicos):
features/animals/assets/
  └── animal-placeholder.png

Uso (dentro de la feature):
import placeholder from '../assets/animal-placeholder.png';
```

---

## Referencias

- [Bulletproof React GitHub](https://github.com/alan2207/bulletproof-react)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Architecture Best Practices](https://kentcdodds.com/blog/colocation)

---

**Última actualización:** 2025-11-29
**Autor:** Claude Code
