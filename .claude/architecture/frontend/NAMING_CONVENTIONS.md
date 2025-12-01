# Naming Conventions - Patitas Unidas Frontend

## Tabla de Contenidos
- [Principios Generales](#principios-generales)
- [Archivos y Carpetas](#archivos-y-carpetas)
- [Componentes React](#componentes-react)
- [Types y Interfaces](#types-y-interfaces)
- [Functions y Variables](#functions-y-variables)
- [CSS y Estilos](#css-y-estilos)
- [Imports y Exports](#imports-y-exports)
- [Quick Reference](#quick-reference)

---

## Principios Generales

### 1. Consistencia Above All
```
✅ Seguir siempre las mismas convenciones
❌ Mezclar diferentes estilos
```

### 2. Descriptive pero Concise
```
✅ getUserById
✅ isAuthenticated
❌ g (demasiado corto)
❌ getUserByIdFromDatabaseUsingAPICall (demasiado largo)
```

### 3. Evitar Abreviaciones
```
✅ animal, foundation, volunteer
❌ anml, fnd, vol
```

### 4. Use English (código) + Spanish (contenido)
```typescript
// ✅ GOOD
interface Animal {
  name: string;        // Código en inglés
  description: string; // Contenido en español
}

const animal = {
  name: "Maximiliano",
  description: "Perro muy amigable" // ✅ Contenido en español
};
```

---

## Archivos y Carpetas

### Carpetas (Directorios)

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Features | `lowercase` | `animals`, `foundations`, `donations` |
| Subcarpetas | `lowercase` | `components`, `routes`, `api`, `types` |
| Shared | `lowercase` | `components`, `hooks`, `lib`, `config` |

```
✅ GOOD:
features/animals/
features/foundations/
components/layout/

❌ BAD:
features/Animals/
features/Foundations/
components/Layout/
```

### Archivos - Componentes React

| Tipo | Convención | Extensión | Ejemplo |
|------|------------|-----------|---------|
| Componentes | `PascalCase` | `.tsx` | `AnimalCard.tsx` |
| Pages/Routes | `PascalCase` | `.tsx` | `Adopta.tsx`, `Home.tsx` |
| Barrel exports | `lowercase` | `.ts` | `index.ts` |

```
✅ GOOD:
AnimalCard.tsx
AnimalDetailModal.tsx
Adopta.tsx

❌ BAD:
animalCard.tsx        (debe ser PascalCase)
animal-card.tsx       (no usar kebab-case)
AnimalCard.jsx        (usar .tsx, no .jsx)
```

### Archivos - Non-Components

| Tipo | Convención | Extensión | Ejemplo |
|------|------------|-----------|---------|
| Services/API | `camelCase` | `.ts` | `animals.ts`, `foundations.ts` |
| Types | `camelCase` | `.ts` | `animal.ts`, `foundation.ts` |
| Hooks | `camelCase` | `.ts` | `useAnimals.ts`, `useLockBodyScroll.ts` |
| Utils | `camelCase` | `.ts` | `formatDate.ts`, `validators.ts` |
| Constants | `camelCase` | `.ts` | `constants.ts`, `config.ts` |
| Config | `camelCase` | `.ts` | `api.ts`, `routes.ts` |

```
✅ GOOD:
animals.ts            (service)
animal.ts             (types)
useAnimals.ts         (hook)
formatDate.ts         (util)

❌ BAD:
Animals.ts            (services no usan PascalCase)
Animal.ts             (types no usan PascalCase)
UseAnimals.ts         (hooks no usan PascalCase)
```

### Archivos - Estilos

| Tipo | Convención | Extensión | Ejemplo |
|------|------------|-----------|---------|
| Component styles | `PascalCase` | `.css` | `AnimalCard.css` |
| Page styles | `PascalCase` | `.css` | `Adopta.css` |
| Global styles | `lowercase` | `.css` | `global.css`, `index.css` |

```
✅ GOOD:
AnimalCard.css         (mismo nombre que componente)
AnimalDetailModal.css  (no Animal-modal.css)
Adopta.css             (mismo nombre que page)
global.css             (global)

❌ BAD:
animalCard.css         (debe ser PascalCase)
Animal-modal.css       (no usar kebab-case)
animal_card.css        (no usar snake_case)
```

**Regla de oro:**
```
Component: AnimalCard.tsx
Styles:    AnimalCard.css  ← Mismo nombre
Test:      AnimalCard.test.tsx  ← Mismo nombre
```

---

## Componentes React

### Component Files

```typescript
// ============================================
// ✅ GOOD: AnimalCard.tsx
// ============================================
import type { AnimalData } from '../types/animal';
import './AnimalCard.css';

interface AnimalCardProps {
  animal: AnimalData;
  onSelect: () => void;
}

export default function AnimalCard({ animal, onSelect }: AnimalCardProps) {
  return <div className="animal-card">{/* ... */}</div>;
}

// ============================================
// ❌ BAD
// ============================================
// Nombre de archivo: animalCard.tsx (debe ser PascalCase)
// Function name: animalCard (debe ser PascalCase)
// No default export
```

### Component Names

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Function component | `PascalCase` | `AnimalCard`, `AnimalDetailModal` |
| Component props interface | `[ComponentName]Props` | `AnimalCardProps` |

```typescript
// ✅ GOOD
interface AnimalCardProps { /* ... */ }
function AnimalCard(props: AnimalCardProps) { /* ... */ }

// ❌ BAD
interface IAnimalCardProps { /* ... */ }  // No usar prefijo I
interface Props { /* ... */ }              // Demasiado genérico
function animalCard() { /* ... */ }        // Debe ser PascalCase
```

### Event Handlers

```typescript
// ============================================
// Convención: handle[Event] o on[Event]
// ============================================
✅ GOOD:
const handleClick = () => { /* ... */ };
const handleSubmit = () => { /* ... */ };
const handleAnimalSelect = () => { /* ... */ };

// Props:
interface Props {
  onClick?: () => void;
  onSubmit?: () => void;
  onAnimalSelect?: (animal: Animal) => void;
}

❌ BAD:
const clickHandler = () => { /* ... */ };  // Prefijo handle, no sufijo Handler
const click = () => { /* ... */ };         // Muy genérico
```

---

## Types y Interfaces

### Interface Names

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Data models | `PascalCase` | `Animal`, `Foundation`, `Contact` |
| Props | `[ComponentName]Props` | `AnimalCardProps` |
| API responses | `[Entity]Data` o `[Entity]Response` | `AnimalData`, `FoundationResponse` |
| Form values | `[Form]Values` | `LoginFormValues` |

```typescript
// ============================================
// ✅ GOOD
// ============================================
export interface Animal {
  id: number;
  name: string;
}

export interface AnimalData extends Animal {
  foundation?: Foundation;
}

interface AnimalCardProps {
  animal: AnimalData;
  onSelect: () => void;
}

// ============================================
// ❌ BAD
// ============================================
export interface IAnimal { /* ... */ }       // No prefijo I (C# style)
export interface animal { /* ... */ }         // Debe ser PascalCase
export interface TAnimal { /* ... */ }        // No prefijo T
export interface AnimalInterface { /* ... */ } // Redundante
```

### Type vs Interface

```typescript
// ============================================
// Use INTERFACE for object shapes:
// ============================================
interface Animal {
  id: number;
  name: string;
}

// ============================================
// Use TYPE for:
// ============================================
// Unions
type AnimalType = 'Perro' | 'Gato';

// Intersections
type AnimalWithFoundation = Animal & { foundation: Foundation };

// Primitives
type ID = number | string;

// Function signatures
type OnSelectHandler = (animal: Animal) => void;
```

### Enum-like Types

```typescript
// ============================================
// ✅ GOOD: Union types (preferido)
// ============================================
export type AnimalType = 'Perro' | 'Gato';
export type AnimalAge = 'Cachorro' | 'Adulto' | 'Senior';

// ============================================
// ⚠️ ACCEPTABLE: Enums (si es necesario)
// ============================================
export enum AnimalState {
  Available = 'Disponible',
  Reserved = 'Reservado',
  Adopted = 'Adoptado',
  NeedsHelp = 'Necesita ayuda',
}

// ❌ BAD: String literals sin type
const type = 'Perro'; // ❌ No type safety
```

---

## Functions y Variables

### Functions

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Regular functions | `camelCase` | `getAnimales`, `formatDate` |
| React components | `PascalCase` | `AnimalCard`, `Header` |
| Custom hooks | `use[Feature]` | `useAnimals`, `useLockBodyScroll` |
| Event handlers | `handle[Event]` | `handleClick`, `handleSubmit` |
| Boolean functions | `is/has/should[Condition]` | `isApadrinable`, `hasSpecialNeeds` |

```typescript
// ============================================
// ✅ GOOD
// ============================================
function getAnimales(): Promise<Animal[]> { /* ... */ }
function formatDate(date: Date): string { /* ... */ }
function useAnimals() { /* ... */ }
function isApadrinable(animal: Animal): boolean { /* ... */ }

// ============================================
// ❌ BAD
// ============================================
function GetAnimales() { /* ... */ }        // Debe ser camelCase
function get_animales() { /* ... */ }       // No snake_case
function animales() { /* ... */ }           // Falta verbo
function apadrinable(animal) { /* ... */ }  // Debe ser is/has prefix
```

### Variables

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Variables | `camelCase` | `animal`, `selectedAnimal`, `animalList` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_ANIMALS` |
| Boolean variables | `is/has/should[Condition]` | `isLoading`, `hasError`, `shouldFetch` |
| React state | `[noun]` + `set[Noun]` | `animals` + `setAnimals` |

```typescript
// ============================================
// ✅ GOOD
// ============================================
const animal = getAnimal();
const selectedAnimal = animals.find(a => a.id === id);
const isLoading = true;
const hasError = false;
const API_BASE_URL = 'http://localhost:5176/api';

// React state
const [animals, setAnimals] = useState<Animal[]>([]);
const [isOpen, setIsOpen] = useState(false);

// ============================================
// ❌ BAD
// ============================================
const Animal = getAnimal();                  // Debe ser camelCase
const selected_animal = animals.find(...);   // No snake_case
const loading = true;                        // Debe ser isLoading
const error = false;                         // Debe ser hasError
const apiBaseUrl = 'http://...';             // Constants en UPPER_SNAKE_CASE
```

### Service Objects

```typescript
// ============================================
// Convención: [feature]Service
// ============================================
export const animalService = {
  getAnimales: async () => { /* ... */ },
  getAnimalById: async (id: number) => { /* ... */ },
};

export const foundationService = {
  getFoundations: async () => { /* ... */ },
  getFoundationById: async (id: number) => { /* ... */ },
};
```

---

## CSS y Estilos

### Class Names (BEM-like)

```css
/* ============================================
   Convención: [block]__[element]--[modifier]
   ============================================ */

/* ✅ GOOD */
.animal-card { }
.animal-card__image { }
.animal-card__title { }
.animal-card--urgent { }
.animal-card__badge--special { }

/* ❌ BAD */
.AnimalCard { }              /* No PascalCase en CSS */
.animal_card { }             /* No snake_case */
.animalCard { }              /* No camelCase */
```

### CSS File Organization

```css
/* ============================================
   1. Imports
   ============================================ */
@import './variables.css';

/* ============================================
   2. Component base
   ============================================ */
.animal-card {
  display: flex;
  /* ... */
}

/* ============================================
   3. Elements
   ============================================ */
.animal-card__image {
  /* ... */
}

.animal-card__title {
  /* ... */
}

/* ============================================
   4. Modifiers
   ============================================ */
.animal-card--urgent {
  border: 2px solid red;
}

/* ============================================
   5. States
   ============================================ */
.animal-card:hover {
  /* ... */
}

.animal-card.is-selected {
  /* ... */
}
```

### CSS Variables

```css
/* ============================================
   Convención: --[category]-[property]-[variant]
   ============================================ */

/* ✅ GOOD */
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-danger: #dc3545;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Typography */
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;

  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
}

/* ❌ BAD */
:root {
  --primaryColor: #007bff;    /* No camelCase */
  --spacing_md: 16px;         /* No snake_case */
  --border-radius: 4px;       /* Falta variant (sm/md/lg) */
}
```

---

## Imports y Exports

### Import Order

```typescript
// ============================================
// 1. External dependencies (React, libraries)
// ============================================
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ============================================
// 2. Internal - Other features (absolute paths)
// ============================================
import { Foundation } from '@/features/foundations';
import { Header, Footer } from '@/components';
import { useLockBodyScroll } from '@/hooks';
import { apiCall } from '@/config/api';

// ============================================
// 3. Internal - Same feature (relative paths)
// ============================================
import { animalService } from '../api/animals';
import type { Animal, AnimalData } from '../types/animal';
import { AnimalCard } from '../components/AnimalCard';

// ============================================
// 4. Styles (last, relative)
// ============================================
import '../styles/Adopta.css';
import './AnimalCard.css';
```

### Export Styles

```typescript
// ============================================
// Default export para componentes
// ============================================
// AnimalCard.tsx
export default function AnimalCard() { /* ... */ }

// ============================================
// Named exports para utilities, hooks, services
// ============================================
// animals.ts
export const animalService = { /* ... */ };
export function isApadrinable() { /* ... */ }

// useAnimals.ts
export function useAnimals() { /* ... */ }

// animal.ts
export interface Animal { /* ... */ }
export interface AnimalData extends Animal { /* ... */ }
```

### Barrel Exports

```typescript
// ============================================
// features/animals/index.ts
// ============================================

// Components - re-export default as named
export { default as AnimalCard } from './components/AnimalCard';
export { default as AnimalDetailModal } from './components/AnimalDetailModal';

// Routes - re-export default as named
export { default as Adopta } from './routes/Adopta';

// API - export service object
export { animalService } from './api/animals';
export * from './api/animals'; // Named exports adicionales

// Types - re-export types
export type { Animal, AnimalData } from './types/animal';

// Hooks - re-export functions
export { useAnimals } from './hooks/useAnimals';
```

---

## Quick Reference

### Cheat Sheet

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| **Archivos** | | |
| Component | `PascalCase.tsx` | `AnimalCard.tsx` |
| Service | `camelCase.ts` | `animals.ts` |
| Type | `camelCase.ts` | `animal.ts` |
| Hook | `camelCase.ts` | `useAnimals.ts` |
| Style | `PascalCase.css` | `AnimalCard.css` |
| Barrel | `index.ts` | `index.ts` |
| **Carpetas** | | |
| Feature | `lowercase` | `animals/` |
| Subcarpeta | `lowercase` | `components/` |
| **Código** | | |
| Component | `PascalCase` | `AnimalCard` |
| Function | `camelCase` | `getAnimales` |
| Variable | `camelCase` | `selectedAnimal` |
| Constant | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Interface | `PascalCase` | `Animal` |
| Type | `PascalCase` | `AnimalType` |
| Props interface | `[Name]Props` | `AnimalCardProps` |
| Hook | `use[Feature]` | `useAnimals` |
| Boolean | `is/has[Condition]` | `isLoading` |
| Handler | `handle[Event]` | `handleClick` |
| **CSS** | | |
| Class | `kebab-case` | `.animal-card` |
| BEM element | `[block]__[element]` | `.animal-card__image` |
| BEM modifier | `[block]--[modifier]` | `.animal-card--urgent` |
| CSS variable | `--[category]-[property]` | `--color-primary` |

---

## Ejemplos Completos

### Ejemplo 1: Component completo

```typescript
// ============================================
// File: features/animals/components/AnimalCard.tsx
// ============================================
import type { AnimalData } from '../types/animal';
import './AnimalCard.css';

interface AnimalCardProps {
  animal: AnimalData;
  onSelect: () => void;
  isSelected?: boolean;
}

export default function AnimalCard({
  animal,
  onSelect,
  isSelected = false
}: AnimalCardProps) {
  const isUrgent = animal.state === 'Urgente';

  const handleClick = () => {
    onSelect();
  };

  return (
    <div
      className={`animal-card ${isSelected ? 'animal-card--selected' : ''}`}
      onClick={handleClick}
    >
      <div className="animal-card__image">
        <img src={animal.image} alt={animal.name} />
        {isUrgent && (
          <span className="animal-card__badge animal-card__badge--urgent">
            Urgente
          </span>
        )}
      </div>
      <div className="animal-card__content">
        <h3 className="animal-card__title">{animal.name}</h3>
        <p className="animal-card__description">{animal.description}</p>
      </div>
    </div>
  );
}
```

```css
/* ============================================
   File: features/animals/components/AnimalCard.css
   ============================================ */
.animal-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.animal-card:hover {
  transform: translateY(-4px);
}

.animal-card--selected {
  border: 2px solid var(--color-primary);
}

.animal-card__image {
  position: relative;
  width: 100%;
  height: 200px;
}

.animal-card__badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: var(--border-radius-sm);
  background: var(--color-secondary);
  color: white;
  font-size: var(--font-size-sm);
}

.animal-card__badge--urgent {
  background: var(--color-danger);
}

.animal-card__content {
  padding: var(--spacing-md);
}

.animal-card__title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.animal-card__description {
  margin: 0;
  color: var(--color-text-secondary);
}
```

### Ejemplo 2: Service completo

```typescript
// ============================================
// File: features/animals/api/animals.ts
// ============================================
import { apiCall } from '@/config/api';
import type { Animal, AnimalData } from '../types/animal';

const MOCK_ANIMALS: Animal[] = [
  // Mock data...
];

export const animalService = {
  /**
   * Obtiene todos los animales disponibles para adopción
   * @returns Promise con array de animales
   */
  getAnimales: async (): Promise<Animal[]> => {
    try {
      return await apiCall<Animal[]>('/animals');
    } catch (error) {
      console.error('Error fetching animals:', error);
      return MOCK_ANIMALS;
    }
  },

  /**
   * Obtiene un animal específico por ID
   * @param animalId - ID del animal
   * @returns Promise con los datos completos del animal
   * @throws Error si el animal no existe
   */
  getAnimalById: async (animalId: number): Promise<AnimalData> => {
    try {
      return await apiCall<AnimalData>(`/animals/${animalId}`);
    } catch (error) {
      console.error(`Error fetching animal ${animalId}:`, error);
      throw new Error('Animal not found');
    }
  },
};

/**
 * Verifica si un animal es apadrinable
 * @param animal - Datos del animal
 * @returns true si el animal necesita apadrinamiento
 */
export function isApadrinable(animal: AnimalData): boolean {
  return animal.specialNeeds === true || animal.state === 'Necesita ayuda';
}
```

---

**Última actualización:** 2025-11-29
**Autor:** Claude Code

**IMPORTANTE:** Estas convenciones deben seguirse estrictamente durante la migración y desarrollo futuro del proyecto.
