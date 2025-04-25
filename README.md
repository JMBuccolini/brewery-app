
# 🍺 BreweryApp — Prueba Técnica Fullstack

Este proyecto es una **prueba técnica** que simula una aplicación para explorar cervecerías, visualizar su información, distancia, y gestionar usuarios de forma básica. Está compuesto por un frontend moderno en Next.js + Tailwind y un backend sencillo con NestJS + Prisma + SQLite.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend — NestJS
- **NestJS** (Node.js framework con arquitectura modular)
- **Prisma ORM** con base de datos **SQLite**
- **JWT** para autenticación
- **CORS** habilitado para consumo desde el frontend

### 🎨 Frontend — Next.js (App Router)
- **Next.js 14** con **App Router**
- **React 18**
- **Tailwind CSS**
- **Framer Motion** para animaciones
- **React Leaflet** para mapa y distancia
- **Keen Slider** para carruseles
- **React Calendar** para reservas simuladas
- **Dayjs** para manejar las fechas en el calendario

---

## 📦 Estructura del proyecto

```
/Frontend/   → Frontend en Next.js
/Backend/    → Backend en NestJS
```

---

## 🛠 Cómo iniciar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/brewery-app.git
cd brewery-app
```

---

### 2. Backend — NestJS + Prisma

```bash
cd Backend/backend-nest
npm install
npx prisma generate
npm start
```

> El backend corre en `http://localhost:5000`

### Posibles errores en el backend
 Puede darse un error en generated/prisma/schema.prisma 
 porque las últimas versiones esperan un output, este a veces no se genera correctamente y hay que colocarlo de manera directa en el schema * output = "../generated/prisma" * 



---

### 3. Frontend — Next.js

```bash
cd ../../Frontend/brewery-app
npm install
npm run dev
```

> El frontend corre en `http://localhost:3000`

---

## 👤 Funcionalidades principales

- ✅ Registro y login de usuarios con JWT
- ✅ Carrusel con cervecerías (todas / California)
- ✅ Detalle de cada cervecería
- ✅ Distancia y mapa con ubicación del usuario
- ✅ Comentarios simulados para cada cervecería
- ✅ Página de perfil editable
- ✅ Calendario visual con fechas reservadas simuladas
- ✅ Edición y eliminación de reservas 
- ✅ Campana de notificaciones con las reservas
- ✅ Animaciones sutiles y diseño responsive completo

---

## 📎 Notas adicionales

- Las opiniones están simuladas desde un json, no se conectan con el backend
- La base de datos está en SQLite por simplicidad utilizando Prisma
- El diseño está adaptado a mobile y desktop pensando en mobile first

---

## 📫 Autor

> Desarrollado por **Juan Mateo Buccolini** como parte de una prueba técnica Fullstack.
