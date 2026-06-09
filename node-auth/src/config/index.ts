
// el index.ts es un archivo de barril que se encarga de exportar 
// toda la configuración de la aplicación, en este caso, las 
// variables de entorno cargadas desde el archivo .env a través 
// del adaptador envs.ts

// exportamos el adaptador de configuración envs.ts para que pueda 
// ser utilizado en toda la aplicación
export * from './envs.js';
export * from './validators.js';