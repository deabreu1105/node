# MongoDB con Mongo Express

Entorno local de MongoDB con cliente web Mongo Express para gestión de bases de datos.

## Requisitos
- Docker
- Docker Compose

## Configuración

Las credenciales están en el archivo `.env`:
- `MONGO_ROOT_USERNAME`: Usuario root de MongoDB
- `MONGO_ROOT_PASSWORD`: Contraseña del usuario root
- `MONGO_DB`: Base de datos creada al iniciar
- `MONGO_EXPRESS_USER`: Usuario para acceder a Mongo Express
- `MONGO_EXPRESS_PASSWORD`: Contraseña para acceder a Mongo Express

## Iniciar los servicios

```bash
docker-compose up -d
```

## Acceder a Mongo Express

1. Abre tu navegador en: `http://localhost:8081`
2. Ingresa las credenciales:
   - **Usuario**: `admin` (o el configurado en `MONGO_EXPRESS_USER`)
   - **Contraseña**: `mexpress` (o la configurada en `MONGO_EXPRESS_PASSWORD`)

## Conectar desde tu aplicación o MongoDB Compass

```
# Con autenticación
mongodb://admin:secretpassword@localhost:27017

# Con base de datos específica
mongodb://admin:secretpassword@localhost:27017/mydb?authSource=admin
```

## Detener los servicios

```bash
# Detener contenedores
docker-compose down

# Detener y eliminar imágenes
docker-compose down --rmi all

# Detener, eliminar imágenes y volúmenes (¡Esto borra los datos!)
docker-compose down --rmi all --volumes
```

## Personalización

### Scripts de inicialización
- Coloca scripts `.js` o `.sh` en la carpeta `init/` para ejecutarlos automáticamente al crear el contenedor por primera vez
- Los scripts se ejecutan en orden alfabético sobre la DB definida en `MONGO_INITDB_DATABASE`
- Ejemplo: `init/01-init.js`, `init/02-seed.js`

## Notas
- Los datos se almacenan en un volumen Docker llamado `mongodb-data`
- Los scripts de inicialización solo se ejecutan si el volumen está vacío (primera vez)
- Para volver a ejecutar los scripts, elimina el volumen: `docker-compose down --volumes`
- El puerto `27017` está expuesto en local para conectar desde cualquier servicio o herramienta externa






