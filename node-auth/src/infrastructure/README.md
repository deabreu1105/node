
# Infrastructure — Implementaciones concretas

Esta capa **implementa los contratos definidos en `domain`**.  
Aquí sí existen dependencias externas: MongoDB, bcrypt, etc.

> Es el puente entre el núcleo de la app y el mundo exterior.

---

## Estructura

```
infrastructure/
├── datasources/   # Implementación concreta del AuthDataSource con MongoDB
├── repositories/  # Implementación concreta del AuthRepository
└── mappers/       # Transforma datos del modelo de MongoDB a UserEntity
```

---

## DataSources (`datasources/`)

`MongoDBAuthDataSourceImpl` implementa `AuthDataSource` del domain.  
Aquí vive la lógica **real** de acceso a MongoDB.

```ts
// Recibe las funciones de hashing por inyección → fácil de testear
constructor(
  private readonly hashPassword = BcryptAdapter.hashPassword,
  private readonly comparePassword = BcryptAdapter.comparePassword,
)
```

**Flujo de `register`:**
1. Verifica que el email no exista en MongoDB
2. Hashea la contraseña con bcrypt
3. Guarda el usuario en la base de datos
4. Retorna un `UserEntity` (usando el mapper)

**Flujo de `login`:**
1. Busca el usuario por email en MongoDB
2. Compara la contraseña con el hash guardado
3. Retorna un `UserEntity` (usando el mapper)

**Flujo de `getUsers`:**
1. Obtiene todos los usuarios de MongoDB
2. Mapea cada documento a un `UserEntity`
3. Retorna `UserEntity[]`

---

## Repositories (`repositories/`)

`AuthRepositoryImpl` implementa `AuthRepository` del domain.  
Su único trabajo es **delegar** las llamadas al datasource.

```ts
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(dto: RegisterUserDto) { return this.authDataSource.register(dto); }
  login(dto: LoginUserDto)       { return this.authDataSource.login(dto); }
}
```

**¿Por qué esta capa extra?**  
Porque permite cambiar la implementación del datasource (ej: de MongoDB a PostgreSQL)  
sin modificar nada en los casos de uso ni en la presentación. Solo se cambia lo que se inyecta.

---

## Mappers (`mappers/`)

`UserMapper` transforma el **documento de MongoDB** en un **`UserEntity`** del domain.

```ts
// Recibe el objeto crudo de MongoDB y retorna una entidad limpia
UserMapper.userEntityFromObject(mongoDocument)  →  UserEntity
```

Solo contiene métodos estáticos. No necesita ser instanciado.

Esto evita que la entidad del domain quede acoplada a la estructura de MongoDB  
(`_id`, `__v`, campos propios del ORM, etc.).

---

## Relación con Domain

```
AuthDataSource   (domain/datasources)   ← implementa →  MongoDBAuthDataSourceImpl
AuthRepository   (domain/repositories)  ← implementa →  AuthRepositoryImpl
```

Infrastructure **conoce** al domain, pero el domain **no conoce** a infrastructure.
