import mongoose from "mongoose";


interface Options {
  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {

  // Aquí se pueden agregar los métodos para manejar la conexión a la base de datos MongoDB, 
  // como conectar, desconectar, ejecutar consultas, etc.

  constructor() {
    // Aquí se puede inicializar la conexión a la base de datos MongoDB, por ejemplo:
    // this.connect();
  }

  static async connect(options: Options) {

    const { mongoUrl, dbName } = options;

    // lógica para conectar a la base de datos MongoDB

    try {

      // aquí se puede implementar la lógica para conectar a la base de datos MongoDB, por ejemplo:
      await mongoose.connect(mongoUrl, { dbName: dbName });

      console.log('Connected to MongoDB');

      return true;

    } catch (error) {

      console.error('Error connecting to MongoDB', error);

      throw error;

    }

  }

  static async disconnect() {
    // lógica para desconectar de la base de datos MongoDB
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB', error);
    }
  }

  // aquí se pueden agregar otros métodos para ejecutar consultas en la base de datos MongoDB, por ejemplo:
  // find, insert, update, delete, etc.

}