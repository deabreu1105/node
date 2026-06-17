// Script de inicialización de MongoDB
// Se ejecuta automáticamente al crear el contenedor por primera vez
// El contexto ya está en la DB definida por MONGO_INITDB_DATABASE

db.createCollection("users");

db.users.insertMany([
  {
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date(),
  },
  {
    username: "user1",
    email: "user1@example.com",
    role: "user",
    createdAt: new Date(),
  },
]);

// Índice único sobre username y email
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
