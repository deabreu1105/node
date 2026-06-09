
// el archivo envs.ts es un adaptador de configuración que se encarga de cargar las variables de entorno desde el archivo .env y validarlas utilizando la librería env-var.

// importamos la función resolve del módulo path para resolver la ruta del archivo .env
import { resolve } from 'node:path';
// importamos la función config del módulo dotenv para cargar las variables de entorno desde el archivo .env
import { config } from 'dotenv';
// importamos la librería env-var para validar las variables de entorno
import envVar from 'env-var';

// cargamos las variables de entorno desde el archivo .env ubicado en la raíz del proyecto
config({ path: resolve(import.meta.dirname, '../.env') });

export const envs = {
  PORT: envVar.get('PORT').required().asPortNumber(),
};
