# Feature Migration Checklist

Use este checklist para **validar** cada migración de feature a Bulletproof architecture.

---

## Feature: _________________ (llenar)

**Fecha de migración:** _______________
**Migrado por:** _______________

---

## Pre-Migration Checks

### Preparación

- [ ] Git working directory está limpio (`git status`)
- [ ] Estás en el branch correcto (`refactor/bulletproof-architecture`)
- [ ] Has leído `.claude/plans/frontend/MIGRATION_PLAN.md`
- [ ] Has identificado todos los archivos a migrar
- [ ] Has revisado dependencias con otras features

---

## Migration Steps

### 1. Estructura de Directorios

- [ ] Creada carpeta `features/[feature-name]/`
- [ ] Creada subcarpeta `components/` (si aplica)
- [ ] Creada subcarpeta `routes/` (si aplica)
- [ ] Creada subcarpeta `api/` (si aplica)
- [ ] Creada subcarpeta `types/` (si aplica)
- [ ] Creada subcarpeta `styles/` (si aplica)
- [ ] Creada subcarpeta `hooks/` (si aplica)

### 2. Barrel Export

- [ ] Creado archivo `features/[feature-name]/index.ts`
- [ ] Exportados todos los componentes públicos
- [ ] Exportadas todas las routes
- [ ] Exportados todos los services/API
- [ ] Exportados todos los types públicos
- [ ] Exportados todos los hooks (si aplica)
- [ ] Verificada sintaxis de exports (sin errores TypeScript)

### 3. Mover Archivos (git mv)

#### Components
- [ ] Movido componente 1: _________________ → `features/[feature]/components/`
- [ ] Movido componente 2: _________________ → `features/[feature]/components/`
- [ ] Movido componente 3: _________________ → `features/[feature]/components/`
- [ ] (agregar más si es necesario)

#### Routes (Pages)
- [ ] Movida ruta 1: _________________ → `features/[feature]/routes/`
- [ ] Movida ruta 2: _________________ → `features/[feature]/routes/`
- [ ] (agregar más si es necesario)

#### API/Services
- [ ] Movido service: `services/[feature]Service.ts` → `features/[feature]/api/[feature].ts`
- [ ] Renombrado service object (si aplica)

#### Types
- [ ] Movido type file: `types/[feature].ts` → `features/[feature]/types/[feature].ts`
- [ ] (agregar más si es necesario)

#### Styles
- [ ] Movido estilo 1: _________________ → `features/[feature]/styles/`
- [ ] Movido estilo 2: _________________ → `features/[feature]/styles/`
- [ ] Renombrados estilos inconsistentes (ej: `Animal-modal.css` → `AnimalModal.css`)
- [ ] (agregar más si es necesario)

### 4. Actualizar Imports

#### Dentro de la Feature (relative imports)
- [ ] Actualizados imports en componentes (ej: `import type { Animal } from '../types/animal'`)
- [ ] Actualizados imports en routes (ej: `import { AnimalCard } from '../components/AnimalCard'`)
- [ ] Actualizados imports de API/services (ej: `import { animalService } from '../api/animals'`)
- [ ] Actualizados imports de estilos (ej: `import '../styles/AnimalCard.css'`)

#### En App.tsx
- [ ] Actualizado import de route component
  - **Antes:** `import Adopta from '../src/pages/Adopta'`
  - **Después:** `import { Adopta } from './features/[feature]'`
- [ ] (agregar más rutas si aplica)

#### En Otras Features
- [ ] Identificadas otras features que importan tipos de esta feature
- [ ] Actualizados imports a usar barrel export (ej: `import type { Foundation } from '@/features/foundations'`)
- [ ] Verificado que NO hay imports directos a archivos internos (ej: `@/features/[feature]/components/X` ❌)

---

## Validation Checks

### Build & Compilation

- [ ] Ejecutado `npm run build` sin errores
- [ ] No hay errores de TypeScript
- [ ] No hay warnings críticos de TypeScript
- [ ] No hay errores de ESLint críticos

### Functional Testing

#### Navegación y Rutas
- [ ] La ruta principal de la feature carga correctamente
- [ ] Todas las sub-rutas funcionan (si aplica)
- [ ] Navegación entre páginas funciona
- [ ] Parámetros de ruta funcionan (ej: `/adopta/:id`)
- [ ] Redirecciones funcionan correctamente

#### UI y Componentes
- [ ] Todos los componentes renderean correctamente
- [ ] No hay componentes en blanco
- [ ] Imágenes cargan correctamente
- [ ] Iconos/SVGs aparecen correctamente

#### Estilos
- [ ] Estilos se aplican correctamente
- [ ] No hay CSS roto
- [ ] Responsive funciona
- [ ] Hover states funcionan
- [ ] Animaciones/transiciones funcionan

#### Funcionalidad
- [ ] Clicks funcionan (botones, cards, etc.)
- [ ] Modales abren y cierran correctamente
- [ ] Formularios funcionan (si aplica)
- [ ] Validaciones funcionan (si aplica)
- [ ] Búsqueda/filtros funcionan (si aplica)

#### Data & API
- [ ] Datos cargan desde API correctamente
- [ ] Fallback a mock data funciona (si aplica)
- [ ] Loading states funcionan
- [ ] Error handling funciona
- [ ] Datos se muestran correctamente en UI

### Browser Console

- [ ] No hay errores en consola del navegador
- [ ] No hay warnings de React
- [ ] No hay warnings de imports no encontrados
- [ ] No hay errores 404 de archivos

### Cross-Feature Dependencies

- [ ] Features que dependen de esta siguen funcionando
- [ ] Features de las que esta depende siguen funcionando
- [ ] Shared components siguen funcionando

---

## Performance Checks (Opcional)

- [ ] Tiempo de carga no se degradó
- [ ] Lighthouse Performance score aceptable (>70)
- [ ] No hay re-renders innecesarios (React DevTools)

---

## Git Checks

### Antes de Commit

- [ ] Revisado `git status` - solo archivos esperados modificados
- [ ] Revisado `git diff` - cambios tienen sentido
- [ ] No hay archivos duplicados (viejo y nuevo)
- [ ] Historial de archivos se preservó (verificar con `git log --follow [file]`)

### Commit

- [ ] Creado commit con mensaje descriptivo siguiendo formato:
  ```
  refactor(frontend): migrate [feature] to Bulletproof architecture

  - Move components to features/[feature]/components
  - Move routes to features/[feature]/routes
  - Move API to features/[feature]/api
  - Move types to features/[feature]/types
  - Move styles to features/[feature]/styles
  - Create barrel export at features/[feature]/index.ts
  - Update all imports across codebase
  ```

---

## Documentation

- [ ] Actualizado `FEATURES_ROADMAP.md` - marcar feature como migrada
- [ ] Actualizada documentación interna si es necesario
- [ ] Agregados comentarios en código complejo (si aplica)

---

## Issues & Notes

### Problemas Encontrados

_Documentar aquí cualquier problema encontrado durante la migración:_

1.
2.
3.

### Decisiones Tomadas

_Documentar decisiones importantes (ej: por qué se movió X a shared en lugar de feature):_

1.
2.
3.

### TODOs / Mejoras Futuras

_Items que quedaron pendientes para hacer después:_

- [ ]
- [ ]
- [ ]

---

## Sign-off

- [ ] ✅ Migración completada exitosamente
- [ ] ✅ Todas las validaciones pasaron
- [ ] ✅ Commit creado
- [ ] ✅ Feature funcionando en desarrollo

**Migrado por:** _______________
**Fecha:** _______________
**Tiempo total:** _______________ horas

---

## Next Feature

**Próxima feature a migrar:** _______________

---

**Versión:** 1.0
**Última actualización:** 2025-11-29
