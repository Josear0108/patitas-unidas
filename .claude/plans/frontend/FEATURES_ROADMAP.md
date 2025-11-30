# Features Roadmap - Bulletproof Migration

## Estado General de la Migración

```
┌────────────────────────────────────────────────────────────┐
│  ESTADO GLOBAL DE MIGRACIÓN                                │
├────────────────────────────────────────────────────────────┤
│  Total Features: 7                                         │
│  ✅ Migradas: 2                                            │
│  🔄 En progreso: 0                                         │
│  ⏳ Pendientes: 5                                          │
│  ───────────────────────────────────────────────────────   │
│  Progreso: █████░░░░░░░░░░░░░░░░░░ 29%                     │
└────────────────────────────────────────────────────────────┘
```

**Última actualización:** 2025-11-30
**Features completadas:** animals ✅, foundations ✅
**Próxima feature:** donations (BAJA PRIORIDAD)

---

## Índice de Features

1. [animals](#1-feature-animals-adopción) - 🔴 ALTA PRIORIDAD (PILOTO)
2. [foundations](#2-feature-foundations-fundaciones) - 🟡 MEDIA PRIORIDAD
3. [donations](#3-feature-donations-donaciones) - 🟢 BAJA PRIORIDAD
4. [volunteers](#4-feature-volunteers-voluntarios) - 🟢 BAJA PRIORIDAD
5. [home](#5-feature-home-página-principal) - 🟢 BAJA PRIORIDAD
6. [shared-components](#6-shared-components-componentes-compartidos) - 🟡 MEDIA PRIORIDAD
7. [shared-hooks](#7-shared-hooks-hooks-compartidos) - 🟢 BAJA PRIORIDAD

---

## 1. Feature: animals (Adopción)

### Estado: ✅ COMPLETADA

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | animals |
| **Descripción** | Sistema de adopción de animales |
| **Complejidad** | 🔴 Alta |
| **Prioridad** | 🔴 ALTA (Feature piloto) |
| **Dependencias** | foundation.ts (tipo) |
| **Tiempo estimado** | 2-3 horas |
| **Riesgo** | Medio (feature compleja, buen test del proceso) |

### Archivos Involucrados

**Components (2):**
- ✅ `components/AnimalCard.tsx` → `features/animals/components/AnimalCard.tsx`
- ✅ `components/AnimalDetailModal.tsx` → `features/animals/components/AnimalDetailModal.tsx`

**Routes (1):**
- ✅ `pages/Adopta.tsx` → `features/animals/routes/Adopta.tsx`

**API/Services (1):**
- ✅ `services/animalService.ts` → `features/animals/api/animals.ts`

**Types (1):**
- ✅ `types/animal.ts` → `features/animals/types/animal.ts`

**Styles (2):**
- ✅ `styles/Adopta.css` → `features/animals/styles/Adopta.css`
- ✅ `styles/Animal-modal.css` → `features/animals/styles/AnimalModal.css`

**Nuevos archivos:**
- ✅ `features/animals/index.ts` (barrel export)

**Total archivos:** 7 + 1 nuevo = 8 archivos

### Imports a Actualizar

**Archivos que importan de esta feature:**
- `App.tsx` - Importa `Adopta`
- `pages/FoundationDetail.tsx` - Puede usar tipos de Animal

### Estructura Objetivo

```
features/animals/
├── api/
│   └── animals.ts           # animalService renamed
├── components/
│   ├── AnimalCard.tsx
│   └── AnimalDetailModal.tsx
├── routes/
│   └── Adopta.tsx
├── types/
│   └── animal.ts
├── styles/
│   ├── Adopta.css
│   └── AnimalModal.css      # Renamed from Animal-modal.css
└── index.ts                 # Barrel export
```

### Checklist de Migración

- [x] Crear estructura de directorios
- [x] Crear barrel export (`index.ts`)
- [x] Mover componentes con `git mv`
- [x] Mover route con `git mv`
- [x] Mover API service con `git mv`
- [x] Mover types con `git mv`
- [x] Mover estilos con `git mv`
- [x] Actualizar imports internos de la feature
- [x] Actualizar imports en `App.tsx`
- [x] Actualizar imports en otros archivos
- [x] Compilar: `npm run build`
- [x] Testing funcional: `/adopta` funciona
- [x] Testing funcional: Modal de detalles funciona
- [x] Testing funcional: Estilos correctos
- [x] Testing funcional: Imágenes cargan
- [x] Commit con mensaje descriptivo

### Notas Especiales

- ✅ Feature piloto completada exitosamente - proceso validado
- ✅ `Animal-modal.css` renombrado a `AnimalModal.css` (PascalCase consistente)
- ✅ foundation.ts accesible desde ubicación original (pendiente de migración)
- ✅ Mock data en `animals.ts` mantenido como fallback

**Commit:** `596d53e` - 2025-11-29
**Archivos migrados:** 8 (7 movidos + 1 barrel export nuevo)

---

## 2. Feature: foundations (Fundaciones)

### Estado: ✅ COMPLETADA

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | foundations |
| **Descripción** | Sistema de fundaciones y contacto |
| **Complejidad** | 🟡 Media-Alta |
| **Prioridad** | 🟡 MEDIA |
| **Dependencias** | Ninguna |
| **Tiempo estimado** | 1.5-2 horas |
| **Riesgo** | Bajo |

### Archivos Involucrados

**Components (2):**
- ✅ `components/FoundationCard.tsx` → `features/foundations/components/FoundationCard.tsx`
- ✅ `components/ContactModal.tsx` → `features/foundations/components/ContactModal.tsx`

**Routes (2):**
- ✅ `pages/Foundations.tsx` → `features/foundations/routes/Foundations.tsx`
- ✅ `pages/FoundationDetail.tsx` → `features/foundations/routes/FoundationDetail.tsx`

**API/Services (1):**
- ✅ `services/foundationService.ts` → `features/foundations/api/foundations.ts`

**Types (1):**
- ✅ `types/foundation.ts` → `features/foundations/types/foundation.ts`

**Styles (3):**
- ✅ `styles/Foundations.css` → `features/foundations/styles/Foundations.css`
- ✅ `styles/FoundationDetail.css` → `features/foundations/styles/FoundationDetail.css`
- ✅ `styles/ContactModal.css` → `features/foundations/styles/ContactModal.css`

**Nuevos archivos:**
- ✅ `features/foundations/index.ts` (barrel export)

**Total archivos:** 9 + 1 nuevo = 10 archivos

### Imports a Actualizar

**Archivos que importan de esta feature:**
- `App.tsx` - Importa `Foundations`, `FoundationDetail`
- `features/animals/types/animal.ts` - Importa tipo `Foundation`
- `features/animals/api/animals.ts` - Mock data usa Foundation

### Estructura Objetivo

```
features/foundations/
├── api/
│   └── foundations.ts
├── components/
│   ├── FoundationCard.tsx
│   └── ContactModal.tsx
├── routes/
│   ├── Foundations.tsx
│   └── FoundationDetail.tsx
├── types/
│   └── foundation.ts
├── styles/
│   ├── Foundations.css
│   ├── FoundationDetail.css
│   └── ContactModal.css
└── index.ts
```

### Checklist de Migración

- [x] Crear estructura de directorios
- [x] Crear barrel export
- [x] Mover componentes
- [x] Mover routes
- [x] Mover API service
- [x] Mover types
- [x] Mover estilos
- [x] Actualizar imports internos
- [x] Actualizar imports en `App.tsx`
- [x] Actualizar imports en `features/animals/`
- [x] Compilar sin errores
- [x] Testing: `/foundations` funciona
- [x] Testing: `/foundations/:id` funciona
- [x] Testing: Modal de contacto funciona
- [x] Commit

### Notas Especiales

- ✅ Tipo `Foundation` actualizado en `animal.ts` - import correcto desde @/features/foundations
- ✅ Ambas routes migradas y funcionales (lista y detalle)
- ✅ Modal de contacto funcional en Home.tsx y Foundations.tsx
- ✅ Imports actualizados en App.tsx y Home.tsx

**Commit:** `311641d` - 2025-11-30
**Archivos migrados:** 10 (9 movidos + 1 barrel export nuevo)

---

## 3. Feature: donations (Donaciones)

### Estado: ⏳ PENDIENTE

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | donations |
| **Descripción** | Sistema de donaciones (en mantenimiento) |
| **Complejidad** | 🟢 Muy Baja |
| **Prioridad** | 🟢 BAJA |
| **Dependencias** | Ninguna |
| **Tiempo estimado** | 30 minutos |
| **Riesgo** | Muy bajo |

### Archivos Involucrados

**Components (1):**
- ✅ `components/Maintenance.tsx` → `features/donations/components/Maintenance.tsx`

**Routes (1):**
- ✅ `pages/Dona.tsx` → `features/donations/routes/Dona.tsx`

**Styles (1):**
- ✅ `styles/Dona.css` → `features/donations/styles/Dona.css`

**Nuevos archivos:**
- ✅ `features/donations/index.ts`

**Total archivos:** 3 + 1 nuevo = 4 archivos

### Imports a Actualizar

**Archivos que importan:**
- `App.tsx` - Importa `Dona`

### Estructura Objetivo

```
features/donations/
├── components/
│   └── Maintenance.tsx
├── routes/
│   └── Dona.tsx
├── styles/
│   └── Dona.css
└── index.ts
```

### Checklist de Migración

- [ ] Crear estructura
- [ ] Crear barrel export
- [ ] Mover archivos
- [ ] Actualizar imports
- [ ] Compilar
- [ ] Testing: `/dona` muestra mantenimiento
- [ ] Commit

### Notas Especiales

- ✅ Feature incompleta - solo muestra página de mantenimiento
- ✅ Ideal para ganar confianza (muy simple)

---

## 4. Feature: volunteers (Voluntarios)

### Estado: ⏳ PENDIENTE

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | volunteers |
| **Descripción** | Sistema de voluntarios |
| **Complejidad** | 🟢 Baja |
| **Prioridad** | 🟢 BAJA |
| **Dependencias** | Ninguna |
| **Tiempo estimado** | 45 minutos |
| **Riesgo** | Bajo |

### Archivos Involucrados

**Routes (1):**
- ✅ `pages/Voluntario.tsx` → `features/volunteers/routes/Voluntario.tsx`

**API/Services (1):**
- ✅ `services/voluntarioService.ts` → `features/volunteers/api/volunteers.ts`

**Styles (1):**
- ✅ `styles/Voluntario.css` → `features/volunteers/styles/Voluntario.css`

**Nuevos archivos:**
- ✅ `features/volunteers/index.ts`

**Total archivos:** 3 + 1 nuevo = 4 archivos

### Imports a Actualizar

**Archivos que importan:**
- `App.tsx` - Importa `Voluntario`

### Estructura Objetivo

```
features/volunteers/
├── api/
│   └── volunteers.ts
├── routes/
│   └── Voluntario.tsx
├── styles/
│   └── Voluntario.css
└── index.ts
```

### Checklist de Migración

- [ ] Crear estructura
- [ ] Crear barrel export
- [ ] Mover archivos
- [ ] Actualizar imports
- [ ] Compilar
- [ ] Testing: `/voluntario` funciona
- [ ] Commit

---

## 5. Feature: home (Página Principal)

### Estado: ⏳ PENDIENTE

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | home |
| **Descripción** | Página principal / landing |
| **Complejidad** | 🟢 Baja |
| **Prioridad** | 🟢 BAJA |
| **Dependencias** | Ninguna |
| **Tiempo estimado** | 30 minutos |
| **Riesgo** | Bajo |

### Archivos Involucrados

**Routes (1):**
- ✅ `pages/Home.tsx` → `features/home/routes/Home.tsx`

**Styles (1):**
- ✅ `styles/Home.css` → `features/home/styles/Home.css`

**Nuevos archivos:**
- ✅ `features/home/index.ts`

**Total archivos:** 2 + 1 nuevo = 3 archivos

### Imports a Actualizar

**Archivos que importan:**
- `App.tsx` - Importa `Home`

### Estructura Objetivo

```
features/home/
├── routes/
│   └── Home.tsx
├── styles/
│   └── Home.css
└── index.ts
```

### Checklist de Migración

- [ ] Crear estructura
- [ ] Crear barrel export
- [ ] Mover archivos
- [ ] Actualizar imports
- [ ] Compilar
- [ ] Testing: `/patitas-unidas` funciona
- [ ] Commit

---

## 6. Shared Components (Componentes Compartidos)

### Estado: ⏳ PENDIENTE

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | shared-components |
| **Descripción** | Componentes usados en toda la app |
| **Complejidad** | 🟡 Media |
| **Prioridad** | 🟡 MEDIA |
| **Dependencias** | TODAS las features |
| **Tiempo estimado** | 1 hora |
| **Riesgo** | Medio (muchos imports a actualizar) |

### Archivos Involucrados

**Layout (2):**
- ✅ `components/Header.tsx` → `components/layout/Header.tsx`
- ✅ `components/Footer.tsx` → `components/layout/Footer.tsx`
- ✅ `styles/Header.css` → `components/layout/Header.css`
- ✅ `styles/Footer.css` → `components/layout/Footer.css`

**Errors (1):**
- ✅ `pages/NotFound.tsx` → `components/errors/NotFound.tsx`
- ✅ `styles/NotFound.css` → `components/errors/NotFound.css`

**Nuevos archivos:**
- ✅ `components/index.ts`
- ✅ `components/layout/index.ts`
- ✅ `components/errors/index.ts`

**Total archivos:** 6 + 3 nuevos = 9 archivos

### Imports a Actualizar

**Archivos que importan Header/Footer:**
- `features/animals/routes/Adopta.tsx`
- `features/foundations/routes/Foundations.tsx`
- `features/foundations/routes/FoundationDetail.tsx`
- `features/donations/routes/Dona.tsx`
- `features/volunteers/routes/Voluntario.tsx`
- `features/home/routes/Home.tsx`

**Archivos que importan NotFound:**
- `App.tsx`

### Estructura Objetivo

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Header.css
│   ├── Footer.tsx
│   ├── Footer.css
│   └── index.ts
├── errors/
│   ├── NotFound.tsx
│   ├── NotFound.css
│   └── index.ts
└── index.ts
```

### Checklist de Migración

- [ ] Crear estructura
- [ ] Crear barrel exports (3 archivos)
- [ ] Mover Header y Footer a layout/
- [ ] Mover NotFound a errors/
- [ ] Mover estilos junto a componentes
- [ ] Actualizar imports en TODAS las features
- [ ] Actualizar imports en App.tsx
- [ ] Compilar
- [ ] Testing: Header aparece en todas las páginas
- [ ] Testing: Footer aparece en todas las páginas
- [ ] Testing: Página 404 funciona
- [ ] Commit

### Notas Especiales

- ⚠️ **Alto impacto** - Header/Footer están en TODAS las páginas
- ⚠️ Actualizar muchos archivos - hacer con cuidado
- ✅ Estilos se mueven junto a componentes (colocation)

---

## 7. Shared Hooks (Hooks Compartidos)

### Estado: ⏳ PENDIENTE

### Información General

| Atributo | Valor |
|----------|-------|
| **Nombre** | shared-hooks |
| **Descripción** | Hooks reutilizables |
| **Complejidad** | 🟢 Muy Baja |
| **Prioridad** | 🟢 BAJA |
| **Dependencias** | AnimalDetailModal |
| **Tiempo estimado** | 15 minutos |
| **Riesgo** | Muy bajo |

### Archivos Involucrados

**Hooks (1):**
- ✅ `hooks/useLockBodyScroll.ts` (sin cambio de ubicación)

**Nuevos archivos:**
- ✅ `hooks/index.ts`

**Total archivos:** 1 + 1 nuevo = 2 archivos

### Imports a Actualizar

**Archivos que importan:**
- `features/animals/components/AnimalDetailModal.tsx`

### Estructura Objetivo

```
hooks/
├── useLockBodyScroll.ts
└── index.ts
```

### Checklist de Migración

- [ ] Crear barrel export `hooks/index.ts`
- [ ] Actualizar import en AnimalDetailModal
- [ ] Compilar
- [ ] Testing: Modal sigue bloqueando scroll
- [ ] Commit

---

## Dependencias Entre Features

```
┌─────────────────────────────────────────────────────────────┐
│  GRAFO DE DEPENDENCIAS                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                           │
│  │  animals    │───┐                                       │
│  └─────────────┘   │                                       │
│                    ├──→ foundations.types.Foundation       │
│  ┌─────────────┐   │                                       │
│  │foundations  │───┘                                       │
│  └─────────────┘                                           │
│                                                             │
│  ┌─────────────┐                                           │
│  │ donations   │    (sin dependencias)                     │
│  └─────────────┘                                           │
│                                                             │
│  ┌─────────────┐                                           │
│  │ volunteers  │    (sin dependencias)                     │
│  └─────────────┘                                           │
│                                                             │
│  ┌─────────────┐                                           │
│  │    home     │    (sin dependencias)                     │
│  └─────────────┘                                           │
│                                                             │
│  ┌─────────────┐                                           │
│  │   shared    │←─── TODAS las features                   │
│  │ components  │                                           │
│  └─────────────┘                                           │
│                                                             │
│  ┌─────────────┐                                           │
│  │   shared    │←─── animals (AnimalDetailModal)          │
│  │    hooks    │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

**Orden de migración recomendado:**
1. animals (aunque depende de foundation.ts, puede convivir temporalmente)
2. foundations (resolver dependencia de animals)
3. donations, volunteers, home (orden indistinto)
4. shared components (después de todas las features)
5. shared hooks (al final)

---

## Métricas de Progreso

### Por Feature

| Feature | Archivos | Migrados | Progreso |
|---------|----------|----------|----------|
| animals | 8 | 8 | ██████████ 100% ✅ |
| foundations | 10 | 10 | ██████████ 100% ✅ |
| donations | 4 | 0 | ░░░░░░░░░░ 0% ⬅️ SIGUIENTE |
| volunteers | 4 | 0 | ░░░░░░░░░░ 0% |
| home | 3 | 0 | ░░░░░░░░░░ 0% |
| shared-components | 9 | 0 | ░░░░░░░░░░ 0% |
| shared-hooks | 2 | 0 | ░░░░░░░░░░ 0% |
| **TOTAL** | **40** | **18** | ████░░░░░░ **45%** |

### Por Tipo de Archivo

| Tipo | Total | Migrados | Progreso |
|------|-------|----------|----------|
| Components | 9 | 4 | 44% |
| Routes | 8 | 3 | 38% |
| API/Services | 3 | 2 | 67% |
| Types | 2 | 2 | 100% ✅ |
| Styles | 15 | 5 | 33% |
| Hooks | 1 | 0 | 0% |
| Config | 0 | 0 | - |
| Barrel Exports | 7 | 2 | 29% |

---

## Historial de Cambios

| Fecha | Feature | Acción | Commit | Notas |
|-------|---------|--------|--------|-------|
| 2025-11-29 | - | Roadmap creado | - | Preparación inicial |
| 2025-11-29 | animals | ✅ Migración completada | 596d53e | Feature piloto - 8 archivos migrados exitosamente |
| 2025-11-30 | foundations | ✅ Migración completada | 311641d | 10 archivos migrados - imports actualizados en App.tsx y Home.tsx |

---

## Próximos Pasos

1. ✅ Leer y entender este roadmap
2. ✅ Revisar `.claude/plans/frontend/MIGRATION_PLAN.md`
3. ✅ Revisar `.claude/architecture/BULLETPROOF_GUIDE.md`
4. ✅ Crear branch: `git checkout -b refactor/client`
5. ✅ Ejecutar migración de **animals** (piloto)
6. ✅ Validar y ajustar proceso según aprendizajes
7. 🔄 **SIGUIENTE:** Ejecutar migración de **foundations**

---

**Última actualización:** 2025-11-30
**Estado:** 🔄 En progreso - 2/7 features completadas (29%)
**Próxima acción:** Ejecutar Fase 3 - Migración de feature "donations"
