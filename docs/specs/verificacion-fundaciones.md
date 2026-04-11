# Sistema de Verificación de Fundaciones - Patitas Unidas

**Versión:** 1.0  
**Fecha:** Abril 2026

---

## RESUMEN

Sistema que permite a usuarios solicitar verificación para administrar fundaciones de rescate animal en la plataforma Patitas Unidas.

**Proceso en 2 fases:**
1. Verificación del usuario (es administrador legítimo de fundación)
2. Verificación de la fundación completa (información es correcta)

---

## ROLES DEL SISTEMA

### Usuario Normal
- Puede ver fundaciones públicas
- Puede solicitar adopciones (solo a fundaciones verificadas)
- Puede solicitar verificación como administrador de fundación

### Foundation Admin
- Usuario con solicitud de verificación aprobada
- Puede crear y gestionar UNA fundación
- Puede publicar mascotas en adopción (solo si está verificado)

### Super Admin
- Revisa y aprueba/rechaza solicitudes de verificación
- Verifica fundaciones completas
- Puede suspender o rechazar fundaciones

---

## FLUJO COMPLETO

### 1. Usuario Solicita Verificación

**Desde dónde:**  
Menú del usuario → "Mis solicitudes" → Botón "Verificar mi fundación"

**Formulario de solicitud:**
- Nombre de la fundación
- País (default: Colombia)
- Ciudad
- Teléfono de contacto
- Email de contacto (precargado con email de Google)
- Descripción breve (50-500 caracteres)

**Qué pasa:**
- Se crea la solicitud con estado PENDIENTE
- El usuario ve su solicitud en la bandeja
- El botón "Verificar mi fundación" desaparece

**Restricción:**  
Solo puede tener 1 solicitud PENDIENTE a la vez.

---

### 2. Super Admin Revisa Solicitud

**Panel:**  
Lista de todas las solicitudes pendientes con filtros por estado, fecha y ciudad.

**Información que ve:**
- Datos del usuario (nombre, email, foto de Google)
- Datos de la solicitud completa
- Historial de solicitudes anteriores del usuario

**Decisión - APROBAR:**
- Marca la solicitud como APROBADA
- El sistema crea automáticamente una fundación con:
  - Datos básicos (nombre, ciudad, país, teléfono, email)
  - Estado: BORRADOR
  - No verificada
- Usuario ahora puede completar su fundación

**Decisión - RECHAZAR:**
- Debe escribir razón del rechazo (obligatorio)
- Usuario ve la razón y puede volver a solicitar

---

### 3. Usuario Completa su Fundación

**Acceso:**  
Menú del usuario → "Mi fundación"

**Qué encuentra:**

Datos ya llenados (editables):
- Nombre
- Ciudad
- País
- Teléfono
- Email

Datos por completar (obligatorios para publicar):
- Tagline (frase descriptiva)
- Descripción completa
- Misión
- Visión
- Fecha de fundación
- Logo
- Banner
- Sitio web

**Estados de la fundación:**

**BORRADOR:**
- Solo visible para el dueño
- Puede guardar progreso
- Botón "Publicar" deshabilitado hasta completar todo

**PÚBLICA (no verificada):**
- Visible en listados públicos
- SIN badge de verificación
- NO puede recibir solicitudes de adopción
- Mensaje: "Pendiente de verificación"

---

### 4. Super Admin Verifica Fundación

**Panel:**  
Lista de fundaciones públicas no verificadas.

**Información que ve:**
- Toda la información de la fundación
- Datos del administrador
- Historial

**Decisión - VERIFICAR:**
- Marca la fundación como verificada
- Aparece badge "Verificada" en la fundación
- AHORA SÍ puede recibir solicitudes de adopción

**Decisión - SUSPENDER:**
- Fundación deja de ser visible públicamente
- Razón obligatoria
- Usuario debe contactar por correo para solicitar reactivación

**Decisión - RECHAZAR:**
- Fundación deja de ser visible
- Razón obligatoria
- Usuario puede editar y volver a publicar

---

## ESTADOS DEL SISTEMA

### Estados de Solicitudes

| Estado | Descripción |
|--------|-------------|
| PENDIENTE | Esperando revisión del super admin |
| APROBADA | Usuario puede crear su fundación |
| RECHAZADA | Usuario puede volver a solicitar |
| CANCELADA | Usuario canceló, puede volver a solicitar |

### Estados de Fundaciones

| Estado | Descripción |
|--------|-------------|
| BORRADOR | Fundación incompleta, solo visible para el dueño |
| PÚBLICA | Visible en listados, puede estar verificada o no |
| SUSPENDIDA | Bloqueada por admin, no visible públicamente |
| RECHAZADA | Rechazada por admin, usuario puede editar y re-publicar |

### Verificación de Fundación

- `is_verified = false`: Fundación NO verificada (sin badge, no recibe solicitudes)
- `is_verified = true`: Fundación VERIFICADA (con badge, recibe solicitudes)

---

## QUÉ VE CADA USUARIO SEGÚN EL CASO

### Usuario sin solicitud
- Ve botón "Verificar mi fundación" en su bandeja
- Al hacer clic, se abre formulario de solicitud

### Usuario con solicitud PENDIENTE
- Ve card mostrando: "Solicitud en revisión"
- Información: nombre fundación, fecha, estado
- Botón: "Cancelar solicitud"
- NO ve botón para crear otra solicitud

### Usuario con solicitud RECHAZADA
- Ve card mostrando: "Solicitud rechazada"
- Muestra la razón del rechazo
- Mensaje de orientación
- Botón: "Solicitar nuevamente"

### Usuario con solicitud APROBADA
- Nueva opción en menú: "Mi fundación"
- Ve formulario con datos básicos pre-llenados
- Debe completar campos faltantes
- Indicador de progreso: "Campos completados: X/13"

### Usuario con fundación BORRADOR incompleta
- Ve mensaje: "Completa todos los campos para publicar"
- Lista de campos faltantes
- Botón "Publicar" deshabilitado

### Usuario con fundación BORRADOR completa
- Mensaje: "Toda la información está completa"
- Botón "Publicar fundación" habilitado

### Usuario con fundación PÚBLICA no verificada
- Fundación visible en listados (sin badge)
- Panel muestra: "Pendiente de verificación"
- Información de contacto para solicitar verificación
- NO puede recibir solicitudes de adopción

### Usuario con fundación PÚBLICA verificada
- Fundación visible con badge "Verificada"
- Panel muestra estadísticas
- PUEDE recibir solicitudes de adopción
- Acceso a todas las herramientas de gestión

### Usuario con fundación SUSPENDIDA
- Ve mensaje: "Tu fundación ha sido suspendida"
- Muestra razón de la suspensión
- Instrucciones para solicitar reactivación por correo
- NO puede editar mientras esté suspendida

### Usuario con fundación RECHAZADA
- Ve mensaje: "Tu fundación fue rechazada"
- Muestra razón del rechazo
- Botón: "Editar información"
- Botón: "Publicar nuevamente" (después de editar)

---

## REGLAS IMPORTANTES

### Regla 1: Una solicitud activa a la vez
Un usuario solo puede tener 1 solicitud con estado PENDIENTE. Si fue rechazada o cancelada, puede crear otra.

### Regla 2: Una fundación por usuario
Si la solicitud es aprobada, el usuario solo puede tener 1 fundación. No puede crear otra nunca.

### Regla 3: Creación automática de fundación
Cuando el super admin aprueba una solicitud, el sistema crea automáticamente la fundación con los datos básicos en estado BORRADOR.

### Regla 4: Campos obligatorios para publicar
Para cambiar de BORRADOR a PÚBLICA, debe completar TODOS estos campos:
- Tagline, Descripción completa, Misión, Visión, Fecha de fundación, Logo, Banner, Sitio web

### Regla 5: Verificación para recibir solicitudes
Solo fundaciones con estado PÚBLICA y verificación = TRUE pueden recibir solicitudes de adopción.

### Regla 6: Razón obligatoria
El super admin DEBE escribir la razón cuando rechaza una solicitud o una fundación.

### Regla 7: Persistencia de datos
Las solicitudes y fundaciones NO se borran de la base de datos, solo cambian de estado.

### Regla 8: Contacto para reactivación
Usuario con fundación SUSPENDIDA debe enviar correo a Patitas Unidas para solicitar reactivación. Solo el super admin puede reactivarla.

---

## TRANSICIONES DE ESTADOS

### Solicitudes
```
PENDIENTE → APROBADA (super admin aprueba)
PENDIENTE → RECHAZADA (super admin rechaza)
PENDIENTE → CANCELADA (usuario cancela)

RECHAZADA → (usuario puede crear nueva solicitud)
CANCELADA → (usuario puede crear nueva solicitud)
```

### Fundaciones
```
BORRADOR → PÚBLICA (usuario completa y publica)

PÚBLICA (no verificada) → verificada (super admin marca como verificada)
PÚBLICA → SUSPENDIDA (super admin suspende)
PÚBLICA → RECHAZADA (super admin rechaza)

SUSPENDIDA → PÚBLICA (super admin reactiva por solicitud del usuario)

RECHAZADA → PÚBLICA (usuario edita y vuelve a publicar)
RECHAZADA → BORRADOR (usuario guarda como borrador)
```

---

## LISTADOS PÚBLICOS

**Fundaciones visibles:**  
Solo fundaciones con estado PÚBLICA.

**Badge de verificación:**
- Si `is_verified = true`: Muestra badge "✓ Verificada"
- Si `is_verified = false`: Sin badge, muestra "No verificada"

**Filtros disponibles:**
- Por ciudad
- Por estado de verificación (verificadas / todas)

**Restricción de solicitudes:**  
Solo fundaciones PÚBLICAS y VERIFICADAS pueden recibir solicitudes de adopción.

---

## VALIDACIONES

### Formulario de Solicitud
- Todos los campos son obligatorios
- Teléfono: solo números, máximo 50 caracteres
- Email: formato válido
- Descripción: mínimo 50 caracteres, máximo 500

### Formulario de Fundación
- Todos los campos son obligatorios para publicar
- Descripción: mínimo 100 caracteres
- Misión: mínimo 50 caracteres
- Visión: mínimo 50 caracteres
- Logo y Banner: URLs válidas
- Sitio web: URL válida
- Fecha de fundación: no puede ser futura

---

## NOTIFICACIONES

**Versión actual:** NO hay notificaciones automáticas.

El usuario debe entrar a la plataforma para ver cambios de estado en:
- Su solicitud de verificación
- El estado de su fundación

**Versión futura:** Notificaciones por email cuando cambia el estado.

---

## FIN DE LA ESPECIFICACIÓN
