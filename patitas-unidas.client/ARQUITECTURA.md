# ARQUITECTURA DEL PROYECTO - Bulletproof React

**Última actualización:** 2025-12-01
**Arquitectura:** Bulletproof React (Feature-Based)

---

## Estructura de Carpetas

El proyecto sigue la arquitectura **Bulletproof React**, organizando el código por **features** (funcionalidades) en lugar de por tipo de archivo.

```
src/
│
├── features/              # 🎯 Feature-based organization (CORE)
│   ├── animals/           # Feature: Adopción de animales
│   │   ├── api/           # API calls específicas de animales
│   │   │   └── animals.ts
│   │   ├── components/    # Componentes de la feature
│   │   │   ├── AnimalCard.tsx
│   │   │   └── AnimalDetailModal.tsx
│   │   ├── routes/        # Páginas/rutas de la feature
│   │   │   └── Adopta.tsx
│   │   ├── types/         # Tipos específicos de la feature
│   │   │   └── animal.ts
│   │   ├── styles/        # Estilos de la feature
│   │   │   ├── Adopta.css
│   │   │   └── AnimalModal.css
│   │   └── index.ts       # 📦 Barrel export (Public API)
│   │
│   ├── foundations/       # Feature: Fundaciones
│   │   ├── api/
│   │   │   └── foundations.ts
│   │   ├── components/
│   │   │   ├── FoundationCard.tsx
│   │   │   └── ContactModal.tsx
│   │   ├── routes/
│   │   │   ├── Foundations.tsx
│   │   │   └── FoundationDetail.tsx
│   │   ├── types/
│   │   │   └── foundation.ts
│   │   ├── styles/
│   │   │   ├── Foundations.css
│   │   │   ├── FoundationDetail.css
│   │   │   └── ContactModal.css
│   │   └── index.ts
│   │
│   ├── donations/         # Feature: Donaciones
│   │   ├── components/
│   │   │   └── Maintenance.tsx
│   │   ├── routes/
│   │   │   └── Dona.tsx
│   │   ├── styles/
│   │   │   └── Dona.css
│   │   └── index.ts
│   │
│   ├── volunteers/        # Feature: Voluntarios
│   │   ├── api/
│   │   │   └── volunteers.ts
│   │   ├── routes/
│   │   │   └── Voluntario.tsx
│   │   ├── styles/
│   │   │   └── Voluntario.css
│   │   └── index.ts
│   │
│   └── home/              # Feature: Página principal
│       ├── routes/
│       │   └── Home.tsx
│       ├── styles/
│       │   └── Home.css
│       └── index.ts
│
├── components/            # ♻️ Shared components (usados en toda la app)
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Footer.tsx
│   │   ├── Footer.css
│   │   └── index.ts
│   ├── errors/            # Componentes de error
│   │   ├── NotFound.tsx
│   │   ├── NotFound.css
│   │   └── index.ts
│   ├── ui/                # Componentes UI reutilizables
│   │   ├── CountUp.tsx
│   │   ├── WelcomeModal.tsx
│   │   └── index.ts
│   └── index.ts           # Barrel export principal
│
├── hooks/                 # 🪝 Custom hooks compartidos
│   ├── useLockBodyScroll.ts
│   ├── useWelcomeModal.ts
│   └── index.ts
│
├── config/                # ⚙️ Configuración global
│   └── api.ts             # Configuración de API
│
├── styles/                # 🎨 Estilos globales ONLY
│   ├── global.css
│   └── index.css
│
├── assets/                # 📸 Recursos estáticos (imágenes)
│
├── App.tsx                # Configuración de rutas (React Router)
├── main.tsx               # Entry point de la aplicación
└── vite-env.d.ts

```

---

## Principios de Arquitectura

### 1. Feature-First Organization

**Todo relacionado con una feature está junto:**
- Componentes
- Rutas/Páginas
- API calls
- Tipos
- Estilos
- Hooks (si son específicos de la feature)

**Beneficios:**
- ✅ Fácil encontrar todo lo relacionado con una funcionalidad
- ✅ Features son modulares y pueden ser removidas/añadidas fácilmente
- ✅ Mejor encapsulación y cohesión
- ✅ Escalabilidad mejorada

### 2. Barrel Exports (Public API)

Cada feature tiene un `index.ts` que actúa como **barrel export** (punto de entrada público):

```typescript
// features/animals/index.ts
export { default as AnimalCard } from './components/AnimalCard';
export { default as AnimalDetailModal } from './components/AnimalDetailModal';
export { default as Adopta } from './routes/Adopta';
export { animalService } from './api/animals';
export type { Animal, AnimalData } from './types/animal';
```

**Ventajas:**
- ✅ API limpia y controlada
- ✅ Imports más simples y claros
- ✅ Fácil refactorizar internamente sin romper imports externos

### 3. Separación Shared vs Feature-Specific

**Shared (`/components`, `/hooks`):**
- Componentes usados en **múltiples features**
- Hooks reutilizables
- Lógica agnóstica del dominio de negocio

**Feature-specific (`/features/[feature]`):**
- Componentes usados **solo en esa feature**
- Lógica específica del dominio
- Todo lo necesario para que la feature funcione

---

## Convenciones de Nombres

### Componentes
- **PascalCase** para archivos: `AnimalCard.tsx`, `Header.tsx`
- Componentes deben ser **funcionales** (no class components)
- Usar TypeScript con tipos explícitos

### Routes/Páginas
- **PascalCase** para archivos: `Adopta.tsx`, `Home.tsx`
- Ubicación: `features/[feature]/routes/`
- URLs en **lowercase-with-hyphens**: `/adopta`, `/foundations`

### API/Services
- **camelCase** para archivos: `animals.ts`, `foundations.ts`
- Ubicación: `features/[feature]/api/`
- Exportar objetos con métodos: `animalService.getAnimales()`

### Tipos
- **camelCase** para archivos: `animal.ts`, `foundation.ts`
- Usar `interface` para objetos públicos
- Usar `type` para unions, intersections, aliases

### Estilos
- **PascalCase.css** para componentes: `AnimalCard.css`, `Header.css`
- **PascalCase.css** para rutas: `Adopta.css`, `Home.css`
- Colocación: **junto al archivo que los usa** (colocation)

### Hooks
- **camelCase** con prefijo `use`: `useLockBodyScroll.ts`
- Ubicación: `/hooks` (shared) o `features/[feature]/hooks/` (específicos)

---

## Path Aliases

El proyecto usa **path aliases** para imports más limpios:

```typescript
// Configurado en vite.config.ts y tsconfig.app.json

"@/*"           → "./src/*"
"@features/*"   → "./src/features/*"
"@components/*" → "./src/components/*"
"@hooks/*"      → "./src/hooks/*"
"@config/*"     → "./src/config/*"
```

**Ejemplos de uso:**

```typescript
// ✅ CORRECTO - Usando aliases
import { Header, Footer } from '@components';
import { useLockBodyScroll } from '@hooks';
import { Adopta } from '@features/animals';
import { API_BASE_URL } from '@config/api';

// ❌ EVITAR - Rutas relativas largas
import { Header } from '../../../components/layout/Header';
```

---

## Reglas de Imports

### 1. Usar Barrel Exports

```typescript
// ✅ CORRECTO - Import desde barrel
import { AnimalCard, Adopta } from '@features/animals';
import { Header, Footer } from '@components';

// ❌ INCORRECTO - Import directo de archivos internos
import AnimalCard from '@features/animals/components/AnimalCard';
```

### 2. Imports Relativos Dentro de Features

```typescript
// Dentro de features/animals/routes/Adopta.tsx

// ✅ CORRECTO - Imports relativos dentro de la feature
import { AnimalCard } from '../components/AnimalCard';
import { animalService } from '../api/animals';
import type { AnimalData } from '../types/animal';
import '../styles/Adopta.css';

// ✅ TAMBIÉN CORRECTO - Imports absolutos desde shared
import { Header, Footer } from '@components';
import { useLockBodyScroll } from '@hooks';
```

### 3. No Importar Entre Features Directamente

```typescript
// ❌ EVITAR - Import directo entre features
import { FoundationCard } from '@features/foundations/components/FoundationCard';

// ✅ CORRECTO - Usar barrel export
import { FoundationCard } from '@features/foundations';
```

---

## Flujo de Datos y Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERACTION                    │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│            FEATURE ROUTE (Page Component)               │
│  features/[feature]/routes/[Page].tsx                   │
│  - Handles routing and page-level logic                 │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              FEATURE COMPONENTS                         │
│  features/[feature]/components/[Component].tsx          │
│  - UI rendering and user interactions                   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                 API SERVICE                             │
│  features/[feature]/api/[service].ts                    │
│  - Data fetching and business logic                     │
│  - Communicates with backend API                        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  BACKEND API                            │
│  https://localhost:7100/api                             │
└─────────────────────────────────────────────────────────┘
```

---

## Rutas de la Aplicación

Configuradas en `App.tsx`:

```typescript
/patitas-unidas          → Home (features/home)
/adopta                  → Adopta (features/animals)
/adopta/:id              → Animal detail modal
/dona                    → Dona (features/donations)
/voluntario              → Voluntario (features/volunteers)
/foundations             → Foundations (features/foundations)
/foundations/:id         → Foundation detail
*                        → NotFound (components/errors)
```

---

## Buenas Prácticas

### 1. Mantener Features Independientes

✅ **DO:**
- Una feature debe poder funcionar sin depender directamente de otra feature
- Si necesitas compartir lógica, muévela a `/components` o `/hooks`

❌ **DON'T:**
- No crear dependencias circulares entre features
- No importar componentes internos de otras features

### 2. Colocation (Cercanía)

✅ **DO:**
- Mantener archivos relacionados cerca (componente + estilos + tests)
- Estilos junto al componente que los usa

❌ **DON'T:**
- No separar estilos en un directorio global si son específicos de un componente

### 3. Separation of Concerns

✅ **DO:**
- Lógica de negocio en `/api`
- Lógica de UI en componentes
- Tipos compartidos en `/types` dentro de cada feature

❌ **DON'T:**
- No mezclar lógica de API dentro de componentes
- No hacer fetch directo en componentes (usar servicios)

### 4. Evitar Over-Engineering

✅ **DO:**
- Crear features cuando haya funcionalidad clara y delimitada
- Mantener componentes simples y enfocados

❌ **DON'T:**
- No crear features innecesarias
- No abstraer prematuramente

---

## Testing (Futuro)

Cuando se implementen tests, seguir esta estructura:

```
features/animals/
├── components/
│   ├── AnimalCard.tsx
│   └── AnimalCard.test.tsx       # Test junto al componente
├── api/
│   ├── animals.ts
│   └── animals.test.ts           # Test junto al servicio
```

---

## Documentación Adicional

- **Migration Plan:** `.claude/plans/frontend/MIGRATION_PLAN.md`
- **Features Roadmap:** `.claude/plans/frontend/FEATURES_ROADMAP.md`
- **Bulletproof Guide:** `.claude/architecture/BULLETPROOF_GUIDE.md`
- **Project Instructions:** `CLAUDE.md`

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Build
npm run build            # Compila para producción

# Linting
npm run lint             # Ejecuta ESLint

# Preview
npm preview              # Preview del build de producción
```

---

## Migración Completada ✅

**Fecha de finalización:** 2025-12-01
**Features migradas:** 7/7 (100%)

1. ✅ animals
2. ✅ foundations
3. ✅ donations
4. ✅ volunteers
5. ✅ home
6. ✅ shared-components
7. ✅ shared-hooks

**Fase 5 - Limpieza y Optimización:** ✅ Completada
- Directorios vacíos eliminados
- Path aliases configurados
- Barrel exports optimizados
- Documentación actualizada

---

**Versión:** 2.0 (Bulletproof Architecture)
**Última actualización:** 2025-12-01
