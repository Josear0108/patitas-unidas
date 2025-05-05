# ARQUITECTURA DEL PROYECTO

## Estructura de Carpetas

```
src/
│
├── assets/         # Imágenes, íconos y recursos estáticos
├── components/     # Componentes reutilizables (Header, Footer, etc.)
├── pages/          # Páginas principales de la aplicación (Home, Adopta, Dona, Voluntario, NotFound)
├── services/       # Lógica de negocio y llamadas a APIs
├── styles/         # Archivos CSS globales y específicos de componentes/páginas
├── types/          # Definiciones de tipos y modelos TypeScript
├── App.tsx         # Componente principal de la aplicación
├── main.tsx        # Punto de entrada de la aplicación
└── ...
```

## Convenciones

- **Componentes**:  
  - Los componentes reutilizables van en `components/` y deben ser funcionales y escritos en TypeScript.
  - Los nombres de los archivos de componentes deben ser en PascalCase (ejemplo: `Header.tsx`).

- **Páginas**:  
  - Cada página principal debe tener su propio archivo en `pages/` y puede tener su propio archivo de estilos en `styles/`.
  - Los nombres de las páginas también deben ser en PascalCase (ejemplo: `Home.tsx`).

- **Servicios**:  
  - Los servicios para llamadas a APIs o lógica de negocio van en `services/` y deben exportar funciones.

- **Tipos**:  
  - Todas las interfaces y tipos globales deben estar en `types/`.

- **Estilos**:  
  - Los estilos globales van en `styles/global.css`.
  - Los estilos específicos de componentes o páginas deben estar en archivos separados dentro de `styles/`.

## Reglas adicionales

- Usar React Router para la navegación entre páginas.
- Mantener la lógica de negocio fuera de los componentes, usando servicios.
- Los assets deben ser referenciados desde la carpeta `assets/`.
- Los nombres de las rutas deben ser en minúsculas y, si es necesario, separados por guiones. 