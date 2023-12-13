# SyTW monorepo template

* example of a [Monorepo Architecture](https://levelup.gitconnected.com/monorepo-architecture-with-simple-example-484ca725bf2c) 

Para que funcione al clonar hay que poner los siguientes comandos:

```
nvm install 16
nvm use 16
```

## Pruebas de funcionamiento en servidor remoto

Para probar la aplicación en un servidor remoto, se ha de conectar con la vpn de la ull y desde un navegador entrar a 10.6.131.8:8080

## Funcionamiento de la aplicación
### Estructura del repostitorio

Este repositorio está dividido en dos partes, una parte de frontend y otra de backend. La parta de frontend está en la carpeta client y la parte de backend en la carpeta server. Cada una de estas carpetas tiene su propio package.json y sus propias dependencias.

Dentro de la carpeta de client, se encuentra una carpeta llamada cypress, que es donde se encuentran los tests de la aplicación. Estos tests se ejecutan con el comando *npm run test1* para la versión normal y *npm run test* para la versión interactiva. Para que estos tests funcionen, se ha de tener el servidor corriendo en el puerto 8080. Para ello, se ha de ejecutar el comando *npm run start* en la carpeta principal. 
Hay una carpeta src que es donde se encuentra el código del frontend. Dentro de esta carpeta se encuentran varias subcarpetas más, como la de router, que es donde está el *index.ts*, la carpeta views, que es donde se encuentran las vistas de la aplicación. Además, hay otros ficheros como el *App.vue*, el *main.ts* o el *store.ts*.

Dentro de la carpeta server, encontramos otra carpeta src, que es donde está todo el código del servidor. Dentro de esta carpeta encontramos la subcarpeta models, que es donde se encuentran los modelos, la subcarpeeta routers, que es donde se gestionan las diferentes peticiones en diferentes rutas. Además hay un fichero *db.ts*, que es donde se encuentra la conexión con la base de datos. Por último, hay un fichero *server.ts*, que es donde se encuentra el servidor en sí.

### Funcionamiento de la aplicación

La aplicación consiste en una plataforma donde los usuarios pueden encontrar barajas del *Hearsthone*, pueden intercambiar comentarios en barajas de los demás y compartir las suyas propias. La aplicación consta de una página de inicio, una de inicio de sesión, una de registro, una de perfil, una de búsqueda de barajas y una de creación de barajas. Con esta plataforma, los usuarios pueden compartir sus barajas y comentar las de los demás.


