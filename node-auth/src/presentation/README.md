
# Presentation — Capa HTTP

Es la capa **más externa** de la arquitectura.  
Se encarga de recibir las peticiones HTTP y delegar el trabajo al domain a través de los casos de uso.

> Aquí vive Express. Si mañana quisieras cambiar Express por Fastify, solo cambias esta capa.

---

## Estructura

```
presentation/
├── server.ts         # Configuración e inicio del servidor Express
├── routes.ts         # Enrutador principal (agrupa todas las rutas)
├── auth/
│   ├── routes.ts     # Rutas específicas de autenticación
│   └── controller.ts # Controlador: valida entrada y ejecuta casos de uso
└── middlewares/
    └── auth.middleware.ts  # Verifica el token JWT en rutas protegidas
```

---

## Controller (`auth/controller.ts`)

El controlador tiene **tres responsabilidades únicas**:

1. **Validar la entrada** usando DTOs
2. **Ejecutar el caso de uso** correspondiente
3. **Retornar la respuesta HTTP**

```ts
// No contiene lógica de negocio. Solo orquesta.
registerUser = async (req, res) => {
  const [error, dto] = RegisterUserDto.create(req.body);  // 1. validar
  if (error) return res.status(400).json({ error });

  new RegisterUser(this.authRepository)  // 2. ejecutar caso de uso
    .execute(dto!)
    .then(data => res.json(data))        // 3. responder
    .catch(err => this.handleError(err, res));
};
```

Todos los métodos siguen el mismo patrón. El controlador no accede a MongoDB, modelos  
ni librerías externas directamente. Solo habla con casos de uso del domain.

Recibe el `authRepository` por **inyección de dependencias**. No sabe nada de MongoDB.

---

## Rutas (`auth/routes.ts`)

Define los endpoints y conecta cada uno con su método del controlador.  
Aquí también se aplican los middlewares necesarios (ej: autenticación).

| Método | Ruta         | Controlador         | Middleware     |
|--------|--------------|---------------------|----------------|
| POST   | `/register`  | `registerUser`      | —              |
| POST   | `/login`     | `loginUser`         | —              |
| GET    | `/`          | `getUsers`          | `AuthMiddleware.validateJWT` |

---

## Middleware (`middlewares/auth.middleware.ts`)

Protege rutas verificando que el token JWT del header `Authorization` sea válido.

```
Request → [AuthMiddleware] → valida JWT → adjunta user al req.body → Controller
                           ↓ token inválido
                        401 Unauthorized
```

---

## Composición (dónde se conecta todo)

En `auth/routes.ts` se ensamblan las capas:

```ts
// Se instancian las implementaciones concretas de infrastructure
const dataSource = new MongoDBAuthDataSourceImpl();
const repository = new AuthRepositoryImpl(dataSource);

// Se inyectan en el controlador de presentation
const controller = new AuthController(repository);
```

Este es el único lugar donde `presentation` conoce a `infrastructure`.  
El controlador solo conoce la **abstracción** `AuthRepository` del domain.
