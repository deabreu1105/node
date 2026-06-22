
// Entidad del domain: representa un usuario tal como existe dentro de la aplicación.
//
// DIFERENCIA CLAVE con el modelo de MongoDB:
//   - UserModel  → documento de Mongoose, acoplado a la BD (tiene _id, __v, etc.)
//   - UserEntity → objeto puro del domain, sin dependencias externas
//
// Esto aplica el principio de aislamiento: si cambias MongoDB por PostgreSQL,
// UserEntity no cambia. Solo cambia el mapper y el datasource en infrastructure.
export class UserEntity {

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
  ) {}

}