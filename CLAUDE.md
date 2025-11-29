# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## VISIÓN GENERAL DEL SISTEMA

Patitas Unidas es una plataforma web full-stack para facilitar la adopción y apadrinamiento de animales rescatados a través de fundaciones. El sistema conecta tres actores principales: **Personas** (adoptantes/padrinos), **Animales** (en adopción/apadrinamiento), y **Fundaciones** (organizaciones de rescate).

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND                                 │
│  React 19 + TypeScript + Vite + React Router                │
│  Puerto: https://localhost:60502                            │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/JSON
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API                              │
│  ASP.NET Core 8.0 Web API                                   │
│  Puerto: https://localhost:7100                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  DATA STORAGE                                │
│  In-Memory Repositories (Temporal)                          │
│  → Futuro: Entity Framework Core + SQL Server/PostgreSQL    │
└─────────────────────────────────────────────────────────────┘
```

---

## COMANDOS DE DESARROLLO

### Backend (.NET)
```bash
# Build entire solution
dotnet build patitas-unidas.sln

# Run the API
dotnet run --project backend/PatitasUnidas.Api/PatitasUnidas.Api.csproj

# API will be available at:
# https://localhost:7100
# Swagger: https://localhost:7100/swagger
```

### Frontend (React + Vite)
```bash
# Install dependencies
cd patitas-unidas.client
npm install

# Run development server
npm run dev
# → https://localhost:60502/patitas-unidas

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm preview
```

---

## ARQUITECTURA BACKEND: CLEAN ARCHITECTURE + CQRS

### Diagrama de Capas

```
┌────────────────────────────────────────────────────────────────┐
│                    PatitasUnidas.Api                           │
│                  (Presentation Layer)                          │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Controllers/                                          │     │
│  │  - AnimalsController: /api/animals/*                 │     │
│  │  - FoundationsController: /api/foundations/*         │     │
│  └──────────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Program.cs                                            │     │
│  │  - Dependency Injection                              │     │
│  │  - MediatR Configuration                             │     │
│  │  - CORS Policy                                       │     │
│  │  - Swagger/OpenAPI                                   │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
                            ↓ Depends on
┌────────────────────────────────────────────────────────────────┐
│              PatitasUnidas.Application                         │
│                 (Application Layer)                            │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Animals/                                              │     │
│  │  ├── Queries/                                        │     │
│  │  │   ├── GetAnimals/                                 │     │
│  │  │   │   ├── GetAnimalsQuery                         │     │
│  │  │   │   └── GetAnimalsQueryHandler                  │     │
│  │  │   ├── GetAnimalById/                              │     │
│  │  │   ├── GetAnimalsByFoundation/                     │     │
│  │  │   └── GetApadrinables/                            │     │
│  │  └── DTOs/                                           │     │
│  │      └── AnimalDto                                   │     │
│  ├── Foundations/                                        │     │
│  │  ├── Queries/                                        │     │
│  │  │   ├── GetFoundations/                             │     │
│  │  │   └── GetFoundationById/                          │     │
│  │  └── DTOs/                                           │     │
│  │      ├── FoundationDto                               │     │
│  │      └── ContactDto                                  │     │
│  └── Common/                                             │     │
│      └── Mappings/                                       │     │
│          ├── AnimalMappingExtensions                     │     │
│          └── FoundationMappingExtensions                 │     │
│                                                          │     │
│  📦 Dependencies: MediatR, FluentValidation             │     │
└────────────────────────────────────────────────────────────────┘
                            ↓ Depends on
┌────────────────────────────────────────────────────────────────┐
│                PatitasUnidas.Domain                            │
│                  (Domain Layer)                                │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Entities/                                             │     │
│  │  ├── Animal                                          │     │
│  │  ├── Foundation                                      │     │
│  │  └── Contact                                         │     │
│  └──────────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Repositories/ (Interfaces)                           │     │
│  │  ├── IAnimalRepository                               │     │
│  │  └── IFoundationRepository                           │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                          │     │
│  📦 No external dependencies (Pure Domain)              │     │
└────────────────────────────────────────────────────────────────┘
                            ↑ Implemented by
┌────────────────────────────────────────────────────────────────┐
│            PatitasUnidas.Infrastructure                        │
│               (Infrastructure Layer)                           │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Repositories/ (Implementations)                      │     │
│  │  ├── InMemoryAnimalRepository                        │     │
│  │  │   └── 15 animales con datos quemados              │     │
│  │  └── InMemoryFoundationRepository                    │     │
│  │      └── 6 fundaciones con datos quemados            │     │
│  └──────────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ DependencyInjection.cs                               │     │
│  │  - AddInfrastructure() extension method              │     │
│  │  - Registers repositories as Scoped services         │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

### Principios de Clean Architecture Aplicados

**1. Dependency Rule (Regla de Dependencias)**
```
Infrastructure ──→ Application ──→ Domain
     ↓                  ↓
    Api ────────────────┘

Regla: Las dependencias apuntan hacia adentro (hacia el Domain)
```

**2. Inversión de Dependencias**
- Domain define interfaces (`IAnimalRepository`, `IFoundationRepository`)
- Infrastructure implementa las interfaces
- Application consume las abstracciones, no las implementaciones concretas

**3. Separación de Responsabilidades**
- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Casos de uso, orquestación, DTOs
- **Infrastructure**: Detalles de implementación (acceso a datos)
- **Api**: Entrada/salida HTTP, presentación

---

## PATRÓN CQRS CON MEDIATR

### Arquitectura de Queries

```
HTTP Request (GET /api/animals)
        ↓
┌─────────────────────────────────────────┐
│   AnimalsController.GetAnimals()        │
│   [HttpGet]                             │
└─────────────────────────────────────────┘
        ↓ Send via MediatR
┌─────────────────────────────────────────┐
│   GetAnimalsQuery                       │
│   (Request object - no properties)      │
└─────────────────────────────────────────┘
        ↓ Handled by
┌─────────────────────────────────────────┐
│   GetAnimalsQueryHandler                │
│   : IRequestHandler<                    │
│       GetAnimalsQuery,                  │
│       IEnumerable<AnimalDto>>           │
└─────────────────────────────────────────┘
        ↓ Uses
┌─────────────────────────────────────────┐
│   IAnimalRepository                     │
│   .GetAllAsync()                        │
└─────────────────────────────────────────┘
        ↓ Returns
┌─────────────────────────────────────────┐
│   List<Animal> (Domain Entities)        │
└─────────────────────────────────────────┘
        ↓ Maps with
┌─────────────────────────────────────────┐
│   AnimalMappingExtensions.ToDto()       │
└─────────────────────────────────────────┘
        ↓ Returns
┌─────────────────────────────────────────┐
│   IEnumerable<AnimalDto>                │
│   → JSON Response                       │
└─────────────────────────────────────────┘
```

### Queries Implementadas

**Animals:**
1. `GetAnimalsQuery` → Todos los animales
2. `GetAnimalByIdQuery(int Id)` → Animal específico
3. `GetAnimalsByFoundationQuery(int FoundationId)` → Animales por fundación
4. `GetApadrinablesQuery` → Animales que necesitan apadrinamiento

**Foundations:**
1. `GetFoundationsQuery` → Todas las fundaciones
2. `GetFoundationByIdQuery(int Id)` → Fundación específica

**Commands:** ❌ No implementados (sistema solo lectura actualmente)

---

## MODELO DE DOMINIO

### Entidades y Relaciones

```
┌────────────────────────────────────┐
│         Foundation                 │
├────────────────────────────────────┤
│ • Id: int                          │
│ • Name: string                     │
│ • Logo: string                     │
│ • City: string                     │
│ • Description: string              │
│ • Email: string                    │
│ • Phone: string                    │
│ • Contacts: ICollection<Contact>   │
└────────────────────────────────────┘
         │ 1
         │
         │ Has many
         │
         ↓ *
┌────────────────────────────────────┐
│         Animal                     │
├────────────────────────────────────┤
│ Información básica:                │
│ • Id: int                          │
│ • Name: string                     │
│ • Type: string (Perro/Gato)        │
│ • Age: string                      │
│ • Description: string              │
│ • Image: string (URL)              │
│ • State: string? (Estado)          │
│ • Tag: string? (Etiqueta)          │
│ • FoundationId: int?               │
│ • Foundation: Foundation?          │
│                                    │
│ Información detallada:             │
│ • Breed: string?                   │
│ • Gender: string?                  │
│ • Size: string?                    │
│ • Color: string?                   │
│ • Personality: List<string>        │
│ • HealthStatus: string?            │
│ • Vaccinated: bool?                │
│ • Sterilized: bool?                │
│ • Dewormed: bool?                  │
│ • SpecialNeeds: bool?              │
│ • GoodWith: List<string>           │
│ • NotGoodWith: List<string>        │
│ • AdoptionRequirements: List<str>  │
│ • Story: string?                   │
│ • Images: List<string>             │
│ • CreatedAt: DateTime?             │
└────────────────────────────────────┘
         │ *
         │
         │ Belongs to
         │
         ↓ 1
┌────────────────────────────────────┐
│         Contact                    │
├────────────────────────────────────┤
│ • Id: int                          │
│ • SocialMedia: string              │
│ • Url: string                      │
│ • FoundationId: int                │
│ • Foundation: Foundation?          │
└────────────────────────────────────┘
```

### Reglas de Negocio

**Animales Apadrinables:**
```csharp
// Un animal es apadrinable si cumple alguna de estas condiciones:
animal.State == "Necesita ayuda"
OR animal.SpecialNeeds == true
OR animal.Tag?.Contains("Especial|Tratamiento|Medicamentos|Fisioterapia")
```

**Estados de Animales:**
- `"Disponible"` - Listo para adopción
- `"Reservado"` - En proceso de adopción
- `"Adoptado"` - Ya adoptado
- `"Necesita ayuda"` - Requiere apadrinamiento

---

## ARQUITECTURA FRONTEND

### Estructura de Proyecto React

```
patitas-unidas.client/
├── public/                    # Assets estáticos
├── src/
│   ├── assets/               # Imágenes, íconos
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AnimalCard.tsx
│   │   ├── AnimalDetailModal.tsx
│   │   ├── FoundationCard.tsx
│   │   ├── ContactModal.tsx
│   │   └── Maintenance.tsx
│   ├── pages/                # Páginas (rutas)
│   │   ├── Home.tsx
│   │   ├── Adopta.tsx
│   │   ├── Dona.tsx
│   │   ├── Voluntario.tsx
│   │   ├── Foundations.tsx
│   │   ├── FoundationDetail.tsx
│   │   └── NotFound.tsx
│   ├── services/             # Lógica de API
│   │   ├── animalService.ts
│   │   ├── foundationService.ts
│   │   └── voluntarioService.ts
│   ├── types/                # TypeScript interfaces
│   │   ├── animal.ts
│   │   └── foundation.ts
│   ├── config/               # Configuración
│   │   └── api.ts
│   ├── hooks/                # Custom hooks
│   │   └── useLockBodyScroll.ts
│   ├── styles/               # CSS modules/files
│   ├── App.tsx               # Configuración de rutas
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts
├── package.json
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── ARQUITECTURA.md           # Convenciones del proyecto
```

### Routes (defined in App.tsx)

- `/patitas-unidas` → Home page
- `/adopta` → Animal adoption list
- `/adopta/:id` → Animal adoption with specific ID
- `/dona` → Donation page (currently in maintenance)
- `/voluntario` → Volunteer page
- `/foundations` → Foundation list
- `/foundations/:id` → Foundation detail
- `*` → 404 Not Found

### Flujo de Componentes y Datos

```
main.tsx → App.tsx → Routes
                      ↓
        ┌─────────────┼──────────────┐
        │             │              │
     Home.tsx    Adopta.tsx    FoundationDetail.tsx
        │             │              │
        ↓             ↓              ↓
  animalService  animalService  foundationService
  foundationService              animalService
        │             │              │
        ↓             ↓              ↓
    config/api.ts → fetch() → Backend API
```

### Componentes Reutilizables

**AnimalCard.tsx**
- Props: `animal`, `onSelect`
- Displays: image, name, age, badge "URGENTE" if applicable
- onClick → onSelect(animal)

**AnimalDetailModal.tsx**
- Props: `animal`, `onClose`
- Modal with complete animal information
- Image gallery, health details, adoption requirements
- Uses `useLockBodyScroll()` hook

**FoundationCard.tsx**
- Props: `foundation`, `onContactClick`
- Displays: logo, name, city, "Contactar" button

**ContactModal.tsx**
- Props: `foundation`, `onClose`
- Shows contact methods, social media links, email, phone

**Header.tsx**
- Main navigation
- Links: Home, Adopta, Dona, Voluntario, Fundaciones

**Footer.tsx**
- Contact info, useful links, social media

---

## COMUNICACIÓN FRONTEND-BACKEND

### Configuración de Red

```
FRONTEND (Vite Dev Server)
  URL: https://localhost:60502
  Base Path: /patitas-unidas/

  Proxy: /api/* → https://localhost:7100

        ↓ HTTPS

BACKEND (ASP.NET Core Web API)
  URL: https://localhost:7100

  CORS: ⚠️ ISSUE
    Allows: https://localhost:60503, http://localhost:5173
    Actual: https://localhost:60502
```

### API Endpoints

**Animals:**
- `GET /api/animals` - All animals
- `GET /api/animals/{id}` - Specific animal
- `GET /api/animals/foundation/{foundationId}` - Animals by foundation
- `GET /api/animals/apadrinables` - Sponsorable animals

**Foundations:**
- `GET /api/foundations` - All foundations
- `GET /api/foundations/{id}` - Specific foundation

### Flujo de Request/Response Completo

```
1. User clicks "Ver animales"
2. Adopta.tsx → useEffect() executes
3. animalService.getAnimales() called
4. apiCall<AnimalData[]>('/animals')
5. fetch('http://localhost:5176/api/animals')
6. Vite proxy redirects → https://localhost:7100/api/animals
7. [BACKEND] AnimalsController.GetAnimals()
8. _mediator.Send(new GetAnimalsQuery())
9. GetAnimalsQueryHandler.Handle()
10. _animalRepository.GetAllAsync()
11. InMemoryAnimalRepository returns List<Animal>
12. animals.Select(a => a.ToDto())  // Mapping
13. return Ok(animalDtos)
14. [FRONTEND] Response: AnimalData[]
15. setAnimals(data)  // Update React state
16. Re-render → <AnimalCard /> for each animal
17. User sees animal list
```

---

## MAPEO DE DATOS (DOMAIN ↔ DTO ↔ FRONTEND)

### Pipeline de Transformación

```
BACKEND:
  Domain Entity (Animal)
        ↓
  AnimalMappingExtensions.ToDto()
        ↓
  Application DTO (AnimalDto)
        ↓
  JSON Serialization
        ↓
FRONTEND:
  JSON Deserialization
        ↓
  TypeScript Interface (AnimalData)
        ↓
  React Component
```

### Discrepancias Identificadas

**⚠️ ISSUE: Property Name Mismatch**

Backend DTO:
```csharp
public class FoundationDto
{
    public IReadOnlyCollection<ContactDto> Contacts { get; init; }
    //                                     ^^^^^^^^ Plural
}
```

Frontend Interface:
```typescript
export interface Foundation {
  contact: Contact[]
  //^^^^^ Singular (pero array)
}
```

**Solución necesaria:** Estandarizar a `contacts` (plural) en ambos lados.

---

## DATOS Y SEED

### Animales de Ejemplo (InMemoryAnimalRepository)

**Total: 15 animales**

**Adopción (11):**
1. Maximiliano - Perro Golden Retriever, 3 años
2. Sasha - Perro Pastor Alemán, 2 años
3. Drax - Perro Pitbull, 4 años
4. Tobhias - Perro mestizo, 5 años
5. Blanca nieves - Gato Angora, 1 año
6. Nina - Gato mestizo, 2 años
7. Blue - Perro Husky Siberiano, 1 año
8. Pelusa - Perro Poodle, 7 años
9. Francheska - Gato Siamés, 3 años
10. Antonia - Gato mestizo, 6 meses
11. Tyson - Perro Rottweiler, 4 años

**Apadrinamiento (4):**
12. Luna - Perra mestiza, 8 años, ceguera, medicamentos diarios
13. Max - Perro Labrador, 6 años, displasia de cadera
14. Milo - Gato mestizo, 5 años, diabetes felina
15. Nina - Gata Persa, 10 años, insuficiencia renal

### Fundaciones de Ejemplo

**Total: 6 fundaciones**

1. Huellitas de Amor - Medellín
2. Patitas Felices - Bogotá
3. Amigos Peludos - Medellín
4. Amigos Peludos - Cali
5. Amigos Peludos - Barranquilla
6. Amigos Peludos - Cartagena

Cada fundación tiene contactos para: Instagram, WhatsApp, Facebook

---

## CONVENCIONES Y REGLAS DEL PROYECTO

### Backend (.NET)

**Naming Conventions:**
- Controllers: `{Entity}Controller.cs` (PascalCase)
- Queries: `Get{Entity}Query.cs`, `Get{Entity}QueryHandler.cs`
- DTOs: `{Entity}Dto.cs`
- Repositories: `I{Entity}Repository.cs`, `InMemory{Entity}Repository.cs`
- Entities: `{Entity}.cs` (singular)

**Estructura de carpetas:**
```
Feature/
├── Queries/
│   └── GetFeature/
│       ├── GetFeatureQuery.cs
│       └── GetFeatureQueryHandler.cs
└── DTOs/
    └── FeatureDto.cs
```

**Dependency Injection:**
- Repositories: Scoped lifetime
- MediatR: Auto-registered from assembly
- Infrastructure services: Extension method `AddInfrastructure()`

### Frontend (React + TypeScript)

**⚠️ CRÍTICO - Naming Conventions (definido en ARQUITECTURA.md):**
- Componentes: `PascalCase.tsx` (e.g., `Header.tsx`)
- Pages: `PascalCase.tsx` (e.g., `Home.tsx`)
- Services: `camelCase.ts` (e.g., `animalService.ts`)
- Types: `camelCase.ts` (e.g., `animal.ts`)
- Routes: `lowercase-with-hyphens` (e.g., `/adopta`, `/foundations`)

**Reglas estrictas:**
1. ✅ Componentes DEBEN ser funcionales (no class components)
2. ✅ Lógica de negocio SOLO en `services/`, NUNCA en componentes
3. ✅ Tipos globales en `types/`, no inline
4. ✅ Usar React Router para navegación
5. ✅ Assets referenciados desde `assets/`
6. ✅ Alias `@` apunta a `src/`

**Estructura de componente típica:**
```typescript
// ✅ CORRECTO
import { useState, useEffect } from 'react';
import { animalService } from '@/services/animalService';
import type { Animal } from '@/types/animal';

function MyPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    animalService.getAnimales()
      .then(setAnimals)
      .catch(console.error);
  }, []);

  return (/* JSX */);
}
```

---

## CONFIGURACIÓN DE DESARROLLO

### Certificados HTTPS

**Generación automática:**
```typescript
// vite.config.ts auto-generates certificates using dotnet dev-certs
```

**Ubicación:**
- Windows: `%APPDATA%/ASP.NET/https/`
- Linux/Mac: `~/.aspnet/https/`

**Files:**
- `patitas-unidas.client.pem`
- `patitas-unidas.client.key`

### Variables de Entorno

**Backend (appsettings.json):**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

**Frontend (actualmente hardcoded):**
```typescript
// src/config/api.ts
export const API_BASE_URL = 'http://localhost:5176/api'

// ⚠️ TODO: Mover a variables de entorno
// .env.development:
// VITE_API_URL=http://localhost:5176/api
```

---

## ISSUES Y LIMITACIONES ACTUALES

### 🔴 Críticos

1. **CORS Configuration Mismatch**
   - Frontend: `https://localhost:60502`
   - CORS permite: `https://localhost:60503`, `http://localhost:5173`
   - **Impacto:** Posibles errores de conexión
   - **Solución:** Actualizar `backend/PatitasUnidas.Api/Program.cs:24`

2. **Property Name Inconsistency**
   - Backend: `Contacts` (plural)
   - Frontend: `contact` (array)
   - **Impacto:** Datos pueden no mapearse correctamente
   - **Solución:** Estandarizar a `contacts` en `patitas-unidas.client/src/types/foundation.ts`

3. **Hardcoded API URL**
   - `API_BASE_URL = 'http://localhost:5176/api'`
   - **Impacto:** No portable, problemas en producción
   - **Solución:** Usar variables de entorno (VITE_API_URL)

### 🟡 Advertencias

4. **No Database Persistence**
   - Datos en memoria, se pierden al reiniciar
   - **Impacto:** No apto para producción
   - **Solución:** Implementar Entity Framework Core + SQL Server/PostgreSQL

5. **No Commands Implemented**
   - Solo operaciones de lectura (Queries)
   - **Impacto:** No se pueden crear/editar/eliminar entidades
   - **Solución:** Implementar Commands con MediatR

6. **Mock Data Fallback en Producción**
   - Services retornan datos falsos si API falla
   - **Impacto:** Usuarios ven datos incorrectos
   - **Solución:** Mostrar error UI en lugar de fallback en prod

7. **Dona Page Incompleta**
   - Solo muestra componente "En mantenimiento"
   - **Impacto:** Funcionalidad no disponible
   - **Solución:** Implementar pasarela de pagos o formulario

### 🟢 Mejoras Deseables

8. **No Authentication/Authorization**
   - No hay control de acceso
   - **Solución:** Implementar JWT + Identity

9. **No Input Validation Frontend**
   - Forms sin validación
   - **Solución:** Usar React Hook Form + Zod

10. **Search Not Functional**
    - Adopta.tsx tiene form de búsqueda no conectado
    - **Solución:** Implementar filtrado client-side o endpoint backend

---

## ROADMAP ARQUITECTÓNICO

### Fase 1: Estabilización (Corto Plazo)
- [ ] Corregir CORS mismatch
- [ ] Estandarizar property names (contacts)
- [ ] Mover API URL a variables de entorno
- [ ] Implementar manejo de errores UI (no fallback a mock)

### Fase 2: Persistencia (Mediano Plazo)
- [ ] Implementar Entity Framework Core
- [ ] Crear DbContext y Migrations
- [ ] Implementar repositorios con EF Core
- [ ] Setup SQL Server / PostgreSQL
- [ ] Seed database con datos iniciales

### Fase 3: CRUD Completo (Mediano Plazo)
- [ ] Implementar Commands (Create, Update, Delete)
- [ ] Agregar FluentValidation validators
- [ ] Crear endpoints POST/PUT/DELETE
- [ ] Implementar forms en frontend
- [ ] Validación frontend (React Hook Form)

### Fase 4: Features Avanzados (Largo Plazo)
- [ ] Sistema de autenticación (JWT)
- [ ] Roles: Admin, Foundation, User
- [ ] Upload de imágenes (Azure Blob / AWS S3)
- [ ] Sistema de notificaciones
- [ ] Integración de pagos (Dona page)
- [ ] Dashboard para fundaciones
- [ ] Proceso de aplicación para adopción

### Fase 5: Producción (Largo Plazo)
- [ ] CI/CD pipeline
- [ ] Deployment (Azure / AWS / GCP)
- [ ] Monitoring y logging
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics

---

## PRINCIPIOS ARQUITECTÓNICOS APLICADOS

### SOLID Principles

**S - Single Responsibility**
- Cada handler tiene una sola responsabilidad
- Controllers solo manejan HTTP, delegan a MediatR
- Repositories solo manejan datos

**O - Open/Closed**
- Nuevas queries se agregan sin modificar existentes
- Extensiones de mapping sin modificar DTOs

**L - Liskov Substitution**
- Implementaciones de IRepository son intercambiables
- Se puede cambiar InMemory → EF Core sin romper Application layer

**I - Interface Segregation**
- IAnimalRepository solo tiene métodos de Animal
- IFoundationRepository solo tiene métodos de Foundation

**D - Dependency Inversion**
- Application depende de interfaces (IRepository)
- Infrastructure implementa las interfaces
- No hay dependencias de concreto a concreto

### Separation of Concerns

```
Presentation (API)      → HTTP, Routing, Serialization
Application (CQRS)      → Business Logic, Orchestration
Domain (Entities)       → Business Rules, Validations
Infrastructure (Data)   → Data Access, External Services
```

### DRY (Don't Repeat Yourself)

- Mapping extensions reutilizables
- apiCall() utility para todas las llamadas HTTP
- Componentes reutilizables (AnimalCard, FoundationCard)

### Convention over Configuration

- MediatR auto-descubre handlers
- React Router paths match component names
- Naming conventions consistentes

---

## DIAGRAMA DE FLUJO COMPLETO: Caso de Uso Real

**Scenario:** Usuario navega a `/foundations/1` y ve los animales de esa fundación

```
[USUARIO]
   │
   ├─ Navega a: /foundations/1
   │
   ↓
[BROWSER]
   │
   ├─ React Router match: <FoundationDetail />
   │
   ↓
[FoundationDetail.tsx]
   │
   ├─ useParams() → { id: "1" }
   ├─ useEffect() triggers:
   │   ├─ foundationService.getFoundationById(1)
   │   └─ animalService.getAnimalesPorFundacion(1)
   │
   ↓
[foundationService.ts]
   │
   ├─ apiCall<Foundation>('/foundations/1')
   │
   ↓
[api.ts - apiCall()]
   │
   ├─ fetch('http://localhost:5176/api/foundations/1')
   │
   ↓
[Vite Proxy]
   │
   ├─ Redirect to: https://localhost:7100/api/foundations/1
   │
   ↓
[ASP.NET Core Middleware Pipeline]
   │
   ├─ CORS Check (AllowFrontend policy)
   ├─ Routing
   ├─ Authorization (none currently)
   │
   ↓
[FoundationsController.GetFoundationById(1)]
   │
   ├─ _mediator.Send(new GetFoundationByIdQuery(1))
   │
   ↓
[MediatR Pipeline]
   │
   ├─ Locate handler: GetFoundationByIdQueryHandler
   │
   ↓
[GetFoundationByIdQueryHandler.Handle()]
   │
   ├─ _foundationRepository.GetByIdAsync(1)
   │
   ↓
[InMemoryFoundationRepository.GetByIdAsync()]
   │
   ├─ _foundations.FirstOrDefault(f => f.Id == 1)
   ├─ Returns: Foundation entity
   │
   ↓
[GetFoundationByIdQueryHandler]
   │
   ├─ foundation.ToDto()  // Mapping extension
   ├─ Returns: FoundationDto
   │
   ↓
[FoundationsController]
   │
   ├─ return Ok(foundationDto)
   │
   ↓
[ASP.NET Core Response Pipeline]
   │
   ├─ JSON Serialization
   ├─ CORS headers
   ├─ HTTP 200 OK
   │
   ↓
[Browser receives response]
   │
   ├─ Response.json()
   ├─ Type: Foundation interface
   │
   ↓
[foundationService.ts]
   │
   ├─ Returns foundation to caller
   │
   ↓
[FoundationDetail.tsx]
   │
   ├─ setFoundation(data)
   ├─ React state updated
   ├─ Component re-renders
   │
   ↓
[PARALLEL: animalService.getAnimalesPorFundacion(1)]
   │
   ├─ Same flow but to: /api/animals/foundation/1
   ├─ Returns: Animal[]
   ├─ setAnimals(data)
   │
   ↓
[DOM Rendering]
   │
   ├─ Foundation details displayed
   ├─ Animals mapped to <AnimalCard /> components
   ├─ User sees complete page
   │
   ↓
[USUARIO VE LA PÁGINA COMPLETA]
```

---

## CUANDO TRABAJAR EN ESTE PROYECTO

### Para agregar nuevas features:

**Backend:**
1. Crear entidad en `PatitasUnidas.Domain/Entities/`
2. Crear interface de repositorio en `PatitasUnidas.Domain/Repositories/`
3. Crear DTO en `PatitasUnidas.Application/{Feature}/DTOs/`
4. Crear Query/Command en `PatitasUnidas.Application/{Feature}/Queries|Commands/`
5. Crear Handler correspondiente
6. Crear mapping extension en `PatitasUnidas.Application/Common/Mappings/`
7. Implementar repositorio en `PatitasUnidas.Infrastructure/Repositories/`
8. Registrar en `DependencyInjection.cs`
9. Crear Controller en `PatitasUnidas.Api/Controllers/`

**Frontend:**
1. Crear tipo en `patitas-unidas.client/src/types/`
2. Crear servicio en `patitas-unidas.client/src/services/`
3. Crear componente/página en `patitas-unidas.client/src/components/` o `pages/`
4. Agregar ruta en `App.tsx` si es página
5. Seguir ESTRICTAMENTE las convenciones de `ARQUITECTURA.md`

### Para debugging:

**Backend:**
- Verificar endpoint en Swagger: `https://localhost:7100/swagger`
- Revisar logs en consola donde corre `dotnet run`
- Verificar que repositorio esté registrado en DI

**Frontend:**
- Verificar llamada en Network tab del navegador
- Revisar Console para errores
- Verificar que servicio esté retornando datos correctos
- Revisar si hay fallback a mock data

---

## TECH STACK COMPLETO

**Backend:**
- .NET 8.0
- ASP.NET Core Web API
- MediatR 12.2.0 (CQRS)
- FluentValidation 11.9.0
- Swashbuckle.AspNetCore 6.6.2 (Swagger/OpenAPI)

**Frontend:**
- React 19.0.0
- TypeScript 5.7.2
- Vite 6.3.3
- React Router DOM 7.5.1
- react-slick 0.30.3 (carousel)
- slick-carousel 1.8.1
- react-icons 5.5.0
- ESLint 9.22.0 + TypeScript ESLint 8.26.1

**Development:**
- Visual Studio / VS Code
- Node.js & npm
- .NET CLI
- Git

---

## CONCLUSIÓN

La arquitectura de Patitas Unidas está bien diseñada siguiendo principios de Clean Architecture y CQRS en el backend, con una clara separación de responsabilidades. El frontend React sigue convenciones estrictas definidas en `ARQUITECTURA.md` y mantiene una estructura escalable.

**Fortalezas:**
- ✅ Separación clara de capas
- ✅ Patrones bien implementados (CQRS, Repository, DI)
- ✅ Código type-safe (C# + TypeScript)
- ✅ Convenciones documentadas
- ✅ Fallback a datos mock para desarrollo

**Áreas de mejora:**
- ⚠️ Persistencia de datos (actualmente volátil)
- ⚠️ Operaciones de escritura (solo lectura ahora)
- ⚠️ Configuración de CORS
- ⚠️ Variables de entorno
- ⚠️ Autenticación/Autorización

**Ready for:**
- ✅ Desarrollo de nuevas features
- ✅ Testing (unit, integration)
- ✅ Migración a base de datos real
- ✅ Implementación de Commands
- ✅ Deployment (con ajustes menores)

El sistema está bien posicionado para crecer y escalar siguiendo los mismos patrones arquitectónicos establecidos.
