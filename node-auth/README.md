# node-auth — Clean Architecture con Node.js + TypeScript

API REST de autenticación construida con **Arquitectura Limpia (Clean Architecture)**. Permite registrar e iniciar sesión con usuarios usando JWT y MongoDB.

---

## ¿Qué es Clean Architecture?

Es una forma de organizar el código en capas concéntricas donde **el núcleo no depende de nada externo**.

```
┌──────────────────────────────────────┐
│           PRESENTATION               │  ← Express, rutas, controladores
│  ┌────────────────────────────────┐  │
│  │       INFRASTRUCTURE          │  │  ← Implementaciones concretas (MongoDB, bcrypt)
│  │  ┌──────────────────────────┐ │  │
│  │  │         DOMAIN           │ │  │  ← Núcleo: entidades, casos de uso, contratos
│  │  └──────────────────────────┘ │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Regla de dependencia:** las capas externas dependen de las internas, **nunca al revés**.  
El `domain` no sabe que existe MongoDB, Express ni bcrypt.

---

## Estructura del proyecto

```
src/
├── app.ts                    # Punto de entrada
├── config/                   # Adaptadores y variables de entorno
├── data/                     # Conexión a MongoDB y modelos (esquemas)
├── domain/                   # ★ Núcleo — sin dependencias externas
│   ├── entities/             # Representación de datos en la app
│   ├── dtos/                 # Objetos de transferencia y validación
│   ├── datasources/          # Contratos abstractos de acceso a datos
│   ├── repositories/         # Contratos abstractos de repositorios
│   └── use-cases/            # Lógica de negocio
├── infrastructure/           # Implementaciones concretas del domain
│   ├── datasources/          # Implementación real con MongoDB
│   ├── repositories/         # Implementación real del repositorio
│   └── mappers/              # Transforma datos del modelo a entidad
└── presentation/             # Capa HTTP (Express)
    ├── auth/                 # Rutas y controlador de autenticación
    └── middlewares/          # Middleware de autenticación JWT
```

---

## Instalación y uso

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp src/.env.template src/.env

# Modo desarrollo
pnpm dev

# Compilar y ejecutar producción
pnpm build
pnpm start
```

### Variables de entorno (`src/.env`)

| Variable       | Descripción                        |
|----------------|------------------------------------|
| `PORT`         | Puerto del servidor (ej. `3000`)   |
| `MONGO_URL`    | URL de conexión a MongoDB          |
| `MONGO_DB_NAME`| Nombre de la base de datos         |
| `JWT_SEED`     | Secreto para firmar tokens JWT     |

---

## Endpoints

| Método | Ruta                  | Descripción              | Auth requerida |
|--------|-----------------------|--------------------------|----------------|
| POST   | `/api/auth/register`  | Registrar nuevo usuario  | No             |
| POST   | `/api/auth/login`     | Iniciar sesión           | No             |
| GET    | `/api/auth/`          | Listar usuarios          | Sí (JWT)       |

---

## Scripts disponibles

```json
"dev":   "tsx watch src/app.ts"          // Desarrollo con recarga automática
"build": "rimraf ./dist && tsc"          // Compilar TypeScript
"start": "npm run build && node dist/app.js"  // Producción
```
