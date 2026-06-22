
# Domain — El núcleo de la aplicación

Esta es la capa más importante de la arquitectura limpia.  
Contiene **las reglas de negocio puras** y **no tiene ninguna dependencia externa** (sin Express, sin MongoDB, sin bcrypt).

> Si cambias de MongoDB a PostgreSQL, o de Express a Fastify, esta capa **no se toca**.

---

## Estructura

```
domain/
├── entities/        # Cómo luce un usuario dentro de la app
├── dtos/            # Qué datos se necesitan recibir para cada operación
├── datasources/     # Contrato abstracto: qué puede hacer una fuente de datos
├── repositories/    # Contrato abstracto: intermediario hacia el datasource
├── interfaces/      # Tipos e interfaces compartidas entre casos de uso
└── use-cases/       # Lógica de negocio: qué hace la app con esos datos
```

---

## Entities

Representan un objeto del dominio **tal como vive dentro de la aplicación**.  
No son los modelos de base de datos; son la forma limpia y segura de trabajar con los datos.

```ts
// user.entity.ts
export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public roles: string[],
  ) {}
}
```

---

## DTOs (Data Transfer Objects)

Validan y transportan datos **entre capas**.  
Un DTO responde a la pregunta: _"¿qué información necesito para ejecutar esta operación?"_

```ts
// Si los datos son inválidos, retorna un error en lugar de lanzar una excepción.
const [error, dto] = RegisterUserDto.create(req.body);
```

- `RegisterUserDto` → valida `name`, `email`, `password`
- `LoginUserDto` → valida `email`, `password`

---

## DataSources (contratos)

Clases **abstractas** que definen **qué operaciones** puede hacer una fuente de datos,  
sin importar si esa fuente es MongoDB, PostgreSQL, una API externa, etc.

```ts
abstract class AuthDataSource {
  abstract register(dto: RegisterUserDto): Promise<UserEntity>;
  abstract login(dto: LoginUserDto): Promise<UserEntity>;
}
```

La implementación concreta vive en `infrastructure/`. El domain solo define el contrato.

---

## Repositories (contratos)

También son clases **abstractas**. Su propósito es ser un intermediario entre los  
**casos de uso** y el **datasource**.

```ts
abstract class AuthRepository {
  abstract register(dto: RegisterUserDto): Promise<UserEntity>;
  abstract login(dto: LoginUserDto): Promise<UserEntity>;
}
```

**¿Por qué existe el repositorio si tiene los mismos métodos que el datasource?**  
Porque desacopla la lógica de negocio del origen de los datos. Un repositorio podría  
combinar varios datasources, agregar caché, o cambiar la fuente sin que los casos de uso se enteren.

---

## Use Cases (casos de uso)

Orquestan la lógica de negocio. Cada clase hace **una sola cosa**.  
Reciben el repositorio por **inyección de dependencias** para no depender de implementaciones concretas.

```ts
// Flujo de RegisterUser:
// 1. Llama al repositorio para crear el usuario
// 2. Genera un token JWT
// 3. Retorna { token, user }
new RegisterUser(authRepository).execute(registerUserDto);
```

```ts
// Flujo de LoginUser:
// 1. Llama al repositorio para verificar credenciales
// 2. Genera un token JWT
// 3. Retorna { token, user }
new LoginUser(authRepository).execute(loginUserDto);
```

```ts
// Flujo de GetUsers:
// 1. Llama al repositorio para obtener todos los usuarios
// 2. Retorna UserEntity[]
new GetUsers(authRepository).execute();
```

---

## Interfaces (`interfaces/`)

Almacena tipos e interfaces compartidas entre casos de uso u otras partes del domain,  
evitando duplicación de código.

- `UserToken` — respuesta estándar de `RegisterUser` y `LoginUser`: `{ token, user }`

---

## Flujo de dependencias

```
Use Case  →  Repository (abstracto)  →  [lo implementa Infrastructure]
```

El caso de uso nunca toca MongoDB directamente. Solo habla con el contrato del repositorio.

