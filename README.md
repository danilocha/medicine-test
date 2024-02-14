<p align="center">
    <img src="https://img.shields.io/static/v1.svg?label=Node&message=v10.15.3&labelColor=339933&color=757575&logoColor=FFFFFF&logo=node.js" alt="Node.js website"/>
    <img src="https://img.shields.io/static/v1.svg?label=Npm&message=v6.4.1&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm website"/>
    <img src="https://img.shields.io/static/v1.svg?label=Express&message=v4.17.1&labelColor=444&logoColor=FFFFFF&color=757575&logo=Express" alt="ExpressJS website"/>
    <img alt="GitHub Workflow Status" src="https://github.com/rudemex/node-typescript-express-starter/actions/workflows/build.yml/badge.svg?branch=master">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/rudemex/node-typescript-express-starter?logoColor=FFFFFF&logo=Codecov&labelColor=#F01F7A">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rudemex_node-typescript-express-starter&metric=alert_status" alt="sonarcloud">    
    <img alt="GitHub" src="https://img.shields.io/github/license/rudemex/node-typescript-express-starter">
    <br/> 
</p>

## Glosario

- [📝 Requerimientos básicos](#basic-requirements)
- [🛠️ Instalar dependencias](#install-dependencies)
- [⚙️ Configuración](#configurations)
- [💻 Scripts](#scripts)
- [📚 Swagger](#swagger-info)
- [📤 Commits](#commits)

---

<a name="basic-requirements"></a>

#### 📝 Requerimientos básicos

- Node.js v10.15.3 or higher ([Download](https://nodejs.org/es/download/))
- NPM v6.4.1 or higher
- Typescript
- [Mock Json Server](https://www.npmjs.com/package/mock-json-server)

<a name="install-dependencies"></a>

#### 🛠 Instalar dependencias

Cuando tenemos los requisitos básicos, clonamos el repositorio, vamos a la carpeta del proyecto e instalamos sus
dependencias.

```
 npm install | npm install --force
```

<a name="configurations"></a>

## ⚙️ Configuración

Esta aplicación utiliza la dependencia de [config](https://www.npmjs.com/package/config) para facilitar la configuración
de las variables del entorno, lo que la hace escalable y robusta al desplegar la aplicación en diferentes entornos.

En el directorio `./config` se encuentra un archivo llamado `development.json` que contiene la configuración para un
entorno local, mientras que el archivo `custom-environment-variables.json`
obtiene los valores por medio de los `key` definidos en las variables de entorno que se configuran en el
el servidor.

Básicamente el archivo funciona como un objeto que se exporta y puede ser consumido invocándolo en el archivo que
requiere utilizar la información cargada. Si se necesita añadir más datos para consumir, como la conexión a una base de
datos, a una redis, la url de algún micro-servicio, API, etc. sólo hay que añadirlo en los archivos mencionados manteniendo el
esquema.

```json5
{
  "server": {
    "port": 3000,
    "context": "/api",
    "origins": "http://localhost:3000,http://localhost:3001,http://localhost:8080",
    "originsReadOnly": "http://localhost:3001",
    "headersAllowed": "Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma",
    "methodsAllowed": "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    "corsCredentials": "false",
    "corsEnabled": "true",
    "showLogInterceptor": "false",
    "enabledLogs": "true"
  },
  "swagger": {
    "path":'api-docs',
    "enabled": "true"
  },
  "params": {
  },
  "services": {
  }
}

```

<details>
<summary>🤓 Ver todas las propiedades de configuración disponibles en detalle.</summary>

#### Server

`port`: Es el puerto por el cual va a correr el servidor.

- Type: `Number`
- Default: `8080`

`context`: Es el contexto el que se puede acceder a la API del servidor, de esta manera no se exponen los endpoints en
la ruta principal de la aplicación.

- Type: `String`
- Default: `/api`

`origins`: Es una whitelist para que la aplicación sólo pueda ser consumida por urls confiables y evitar cualquier tipo
de solicitudes no deseadas y maliciosas. Debes escribir las urls separadas por una coma.

- Type: `String`
- Default: `http://localhost:3000,http://localhost:3001,http://localhost:8080`

`originsReadOnly`: Es la configuración de las urls para **CORS**, lo que permite validar quién puede consumir el
servidor.

- Type: `String`
- Default: `http://localhost:3001`

`headersAllowed`: Parámetros que va a recibir por el header en los request.

- Type: `String`
-
Default: `Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma`

`methodsAllowed`: Métodos http disponibles para el cors

- Type: `String`
- Default: `GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS`

`corsCredentials`: Habilita o deshabilita el uso de las credenciales en las peticiones CORS en el servidor.

- Type: `Boolean`
- Default: `false`

`corsEnabled`: Habilita o deshabilita el uso de CORS en el servidor.

- Type: `Boolean`
- Default: `false`

`tz`: Es la configuración de la zona horaria para el
servidor. [Lista de zonas horarias](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)

- Type: `String`
- Default: `America/Argentina/Buenos_Aires`

`showLogInterceptor`: Habilita o deshabilita la visualización de los interceptors de los requests y responses por medio de logs.

- Type: `Boolean`
- Default: `false`

`enabledLogs`: Habilita o deshabilita los logs de la aplicación.

- Type: `Boolean`
- Default: `true`

#### Swagger

`path`: Define la ruta de la documentación **Swagger**, se escribe sin el `/` (slash).

- Type: `String`
- Default: `api-docs`

`enabled`: Habilitar o deshabilitar la documentación **Swagger** de los endpoints del servidor.

- Type: `Boolean`
- Default: `true`

#### Params

Configuración de parámetros a utilizar en la aplicación, manteniendo el esquema `key:value`.

```json5
{
  ...
  "params": {
    "my-param": "<param-value>"
  },
  ...
}
```

</details>

<a name="scriptsr"></a>

## 💻 Scripts

#### Local o Desarrollo

Inicia la aplicación en modo desarrollo usando `nodemon` y `ts-node` para hacer hot reloading. 

```
npm run dev
```

#### Build

Transpile la aplicación limpiando primero la carpeta de destino `./dist`.

```
npm run build
```

#### Producción

Inicia la aplicación de transpilada de la carpeta `./dist`, se requiere previamente haber realizado el **build**.

```
npm run start
```

#### Test

Inicia la fake app para correr los unit test con **Jest** y retorna el coverage.

```
npm run test
```

<a name="swagger-info"></a>

## 📚 Swagger

El proyecto cuenta con un **Swagger** que tiene documentado los endpoints con sus definiciones.

Para documentar los nuevos endpoints, se debe completar con la información de los mismos con la anotación en **YAML** en
el archivo `api-swagger.yaml` que está en el root del proyecto.

Esta documentación puede ser activada o desactivada desde el archivo de configuración o en las variables de entorno del proyecto.

```json5
// ./config/development.json
{
  ...
  "swagger": {
    "path": 'api-docs',
    "enabled": "true"
  },
  ...
}
```

```js
// ENV
SWAGGER_PATH=api-docs
SWAGGER_ENABLED=true;
```

#### URL

Acceso a la documentación y testeo de los endpoints: `http://localhost:3000/api-docs`

#### Scheme

```
<http|https>://<server_url><:port>/<path>
```
<a name="commits"></a>
## 📤 Commits

Para los mensajes de commits se toma como referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (más comunes)
- **scope:** indica la página, componente, funcionalidad
- **description:** comienza en minúsculas y no debe superar los 72 caracteres.