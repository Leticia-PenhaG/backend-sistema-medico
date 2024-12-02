# Sistema Médico Web

Este es un proyecto de gestión para médicos, donde se registra y gestiona la información de los médicos, como su nombre, especialidad, cédula, email, etc. El proyecto utiliza **PostgreSQL** como base de datos, **Node.js** y **Express** para el backend, y **React** para el frontend.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (LTS recomendada): [Descargar Node.js](https://nodejs.org/)
- **PostgreSQL**: [Descargar PostgreSQL](https://www.postgresql.org/download/)

### Clonar el repositorio

Primero, clona el repositorio en tu máquina:

```bash
git clone https://github.com/Leticia-PenhaG/sistema-medico-electiva-3.git
cd sistema-medico


Backend - Express + PostgreSQL
1. Instalar las dependencias del backend
cd backend
npm install

2. Configurar PostgreSQL
Asegúrate de tener PostgreSQL corriendo en tu máquina. Para crear la base de datos, ejecuta el siguiente comando en la terminal de PostgreSQL:

CREATE DATABASE sistema_medico;

En el proyecto, dentro de server.js y config.json, encontrarás los siguientes valores por defecto:

// Configuración de la base de datos en server.js
const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "sistema_medico",
    host: "localhost",
    port: 5432,
    max: 10,
});

// Configuración de la base de datos en config.json
{
  "development": {
// Configuración de la base de datos en config.json
{
  "development": {
    "username": "postgres",
    "password": "12345678",
    "database": "sistema_medico",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
Acordate de reemplazar el username, password y el nombre de la base de datos si es diferente de "sistema_medico".

3. Levantar el servidor backend
Una vez configurado PostgreSQL, ejecuta el siguiente comando para levantar el servidor:
npm start

El servidor debería estar corriendo en: http://localhost:3000


Frontend - React
1. Instalar las dependencias del frontend
Desde la raíz del proyecto, navega a la carpeta del frontend y ejecuta el siguiente comando:

cd frontend
npm install

2. Instalar y configurar Vite
Si aún no tienes Vite configurado en el proyecto, puedes instalarlo con el siguiente comando:
npm install --save-dev vite

Luego, asegúrate de tener un archivo de configuración vite.config.js en la carpeta del frontend. Un ejemplo básico de configuración sería el siguiente:


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});

3. Levantar el servidor frontend
Para levantar el servidor de desarrollo de React, ejecuta:
npm run dev

El frontend debería estar corriendo en http://localhost:5173


Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

sistema-medico/
│
├── sistema-medico-server/              # Código backend (Node.js + Express)
│   ├── models/           # Modelos de datos (conexión a PostgreSQL)
│   ├── routes/           # Rutas de la API
│   ├── server.js         # Archivo principal del servidor y Configuración de variables de entorno
│
└── sistema-medico-web/             # Código frontend (React)
    ├── src/
    │   ├── components/   # Componentes de React
    │   ├── pages/        # Páginas principales
    │   └── App.js        # Componente principal
    ├── public/
    └── package.json      # Configuración del frontend


Nota adicional
El servidor backend y el frontend deben correr en puertos diferentes: 3000 para el backend y 5173 para el frontend.