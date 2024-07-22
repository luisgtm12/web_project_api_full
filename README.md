# Tripleten web_project_api_full

## Proyecto de Autenticación y Manejo de Tarjetas con React, Node.js y MongoDB

Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión y manejar tarjetas (likes y creación de nuevas tarjetas). Utiliza tecnologías modernas como React para el frontend, Node.js y Express para el backend, y MongoDB como base de datos.

## Tecnologías Utilizadas

### Frontend

- **React:** Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router:** Librería para manejar la navegación en la aplicación de una sola página.
- **Context API:** Para manejar el estado global de la aplicación.
- **Fetch API:** Para realizar solicitudes HTTP desde el frontend al backend.

### Backend

- **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
- **Express:** Framework para aplicaciones web en Node.js.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB y Node.js.
- **bcryptjs:** Para el hash de contraseñas.
- **jsonwebtoken:** Para la generación y verificación de tokens JWT.

### Base de Datos

- **MongoDB:** Base de datos NoSQL orientada a documentos.

## Estructura del Proyecto

### Frontend

1. **Componentes Principales:**
   - **App.js:** Componente principal que contiene las rutas y lógica principal de la aplicación.
   - **Login.js:** Componente para el inicio de sesión de usuarios.
   - **Register.js:** Componente para el registro de nuevos usuarios.
   - **Main.js:** Componente principal que muestra las tarjetas y opciones de usuario.
   - **EditProfilePopup.js, EditAvatarPopup.js, AddPlacePopup.js:** Componentes modales para editar perfil, avatar y agregar nuevas tarjetas.
   - **ProtectedRoute.js:** Componente para proteger rutas que requieren autenticación.

2. **Contextos:**
   - **CurrentUserContext.js:** Contexto para manejar el estado global del usuario actual.

3. **Utilidades:**
   - **api.js:** Archivo que contiene todas las funciones para interactuar con el backend.
   - **auth.js:** Archivo que contiene todas las funciones relacionadas con la autenticación de usuarios.

### Backend

1. **Modelos:**
   - **User.js:** Modelo de usuario con validaciones y métodos estáticos para encontrar usuarios por credenciales.

2. **Controladores:**
   - **authController.js:** Contiene la lógica para el registro, inicio de sesión y obtención de perfil de usuario.
   - **cardController.js:** Contiene la lógica para manejar las tarjetas (crear, obtener, dar likes y eliminar likes).

3. **Rutas:**
   - **authRoutes.js:** Rutas para registro e inicio de sesión.
   - **userRoutes.js:** Rutas para obtener y actualizar perfil de usuario.
   - **cardRoutes.js:** Rutas para manejar tarjetas.

4. **Middleware:**
   - **authMiddleware.js:** Middleware para proteger rutas que requieren autenticación.

## Instalación y Ejecución del Proyecto

# Instalación de Dependencias

A continuación se detallan los pasos para instalar las dependencias necesarias para el proyecto, tanto para el frontend como para el backend.

## Instalación del Backend

1. **Navega al directorio del backend:**

   Abre una terminal y cambia al directorio del backend donde está ubicado el archivo `package.json` para el servidor.

   ```bash
   cd backend
   npm install
   npm run dev

1. **Navega al directorio del frontend:**

   Abre una terminal y cambia al directorio del frontend donde está ubicado el archivo `package.json`.
   cd frontend
   npm install
   npm run start

### 1. Clonar el repositorio

```bash
git clone https://github.com/luisgtm12/web_project_api_full.git
cd web_project_api_full