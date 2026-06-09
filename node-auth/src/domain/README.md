

## domain
La idea es que aqui se tenga la información como por ejemplo las reglas que gobiernan toda la aplicación,
es decir aqui vamos a tener los casos de usos, como vamos a implementar siertos adaptadores, como vamos a
implementar datasources, como funcionan los repositorios. Aqui aplicamos las reglas que van a gobernar 
nuestra aplicación y tambien se recomienda que todo el codigo que vamos a colocar en esta carpeta no vamos a tener
dependecias externas, es decir esto no tiene que tener dependencias externas, porque esto romperia la relación 
entre los entes externos que serian los adaptadores no deberian tener inerencia en las reglas de negocio
que gobierna nuestra aplicación


## entities
Las entidades son bien parecidas a como nosotros vamos a trabajar la i9nformación en Base de datos es decir,
como lusen nuestras entradas o nuestros registros en la base de datos es similar pero no es lo mismos



## dtos(data tranfer Object)
Es la data que yo necesito recibir para podersela enviar a otros objetos que van a crear o que lo van a esperar
esa data que se espera o esa data que es usada para mover de un lugar a otro es conosida como un dto, 
y ese es todo su objetivo


## datasources
Van a ser las reglas de negocio (no implementaciones) de las cuales nosotros vamos a regir la optención de datos 


## repositories
Los repositorios son literalmente quienes se van a comunicar con los datasources, porque un repositorio que aqui tambien
van hacer las reglas de repositorios (aqui no hay implementaciones todavia), osea datasources y repositorios son simplemente
abstracciones y los repositorios son los que se van a utilizar para conectarse a sus correspondientes datasources
