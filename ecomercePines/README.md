# 🛒 Ecommerce Pines

Proyecto completo de eCommerce para venta de pines y productos personalizados, con frontend en React + TypeScript y backend con Express y pasarela de pago integrada usando Vexor + Mercado Pago.

---

## 📦 Estructura del Proyecto

```
ECOMERCE/
├── backend/            # Backend con Express y Mercado Pago vía Vexor
├── ecomercePines/      # Frontend con React, Vite y TypeScript
└── README.md
```

---

## 🚀 Tecnologías Utilizadas

### Frontend (`/ecomercePines`)
- React + Vite + TypeScript
- TailwindCSS
- Supabase (Auth y Base de Datos)
- SwiperJS (carruseles)
- Mercado Pago (vía Vexor)
  
### Backend (`/backend`)
- Node.js
- Express
- Vexor SDK
- CORS
- Dotenv

---

## 🔧 Requisitos Previos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com/)
- Cuenta en [Vexor](https://vexor.dev/)
- Cuenta de [Mercado Pago](https://www.mercadopago.com/)

---

## ▶️ Instrucciones de Uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

---

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
VEXOR_PUBLISHABLE_KEY=tu_clave_publica
VEXOR_API_KEY=tu_api_key
VEXOR_PROJECT_ID=tu_project_id
PORT=3000
```

Iniciar backend:

```bash
node index.js
```

> El servidor correrá en: `http://localhost:3000`

---

### 3. Configurar el Frontend

```bash
cd ../ecomercePines
npm install
```

Crear archivo `.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

Iniciar frontend:

```bash
npm run dev
```

> La app se abrirá en: `http://localhost:5173`

---

## 💳 Pago con Mercado Pago

- El usuario puede pagar con tarjeta directamente desde el carrito.
- Al completar el pago es redirigido automáticamente a:
  - ✅ `pago-exitoso`
  - ❌ `pago-error`
  - ⏳ `pago-pendiente`
- El carrito se vacía automáticamente después del pago.

---

## 📦 Base de Datos en Supabase

- **productos**: catálogo de artículos
- **carritos** y **items_carrito**: control del carrito
- **opiniones**: reseñas de productos
- **usuarios**: manejados con Supabase Auth

---

## 📸 Capturas

_(Agrega aquí imágenes si quieres mostrar tu app)_

---

## 🤝 Autor

Desarrollado por **Luis Tapia / Tapia-GJ**
- 💼 Proyecto universitario / personal
- 🌐 Contacto: luivstapia285@gmail.com

---
