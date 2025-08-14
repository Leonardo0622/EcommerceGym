# 🛒 Ecommerce Full-Stack Application

**Estado del Proyecto:** ✅ Backend desplegado en Render | 🚧 Frontend en proceso de despliegue en Vercel

Una aplicación de ecommerce completa construida con tecnologías modernas, incluyendo backend API REST, frontend React/Next.js, y base de datos MongoDB.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **Multer** - Manejo de archivos y uploads
- **Express Validator** - Validación de datos
- **Morgan** - Logger de requests HTTP
- **Swagger** - Documentación de API
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de UI
- **Tailwind CSS** - Framework de CSS utility-first
- **Bootstrap 5** - Framework de CSS
- **Ant Design** - Biblioteca de componentes UI
- **Axios** - Cliente HTTP
- **FontAwesome** - Iconos
- **Leaflet** - Mapas interactivos
- **React Leaflet** - Componentes de mapas para React

### DevOps & Herramientas
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores
- **Git** - Control de versiones

## 📁 Estructura del Proyecto

```
Ecommerce/
├── BackendEcommercr/          # API REST Backend
│   ├── src/
│   │   ├── config/           # Configuración de entorno
│   │   ├── controllers/      # Controladores de la API
│   │   ├── middlewares/      # Middlewares (auth, validación)
│   │   ├── models/           # Modelos de MongoDB
│   │   ├── routes/           # Rutas de la API
│   │   └── server.js         # Servidor principal
│   ├── uploads/              # Archivos subidos
│   ├── Dockerfile            # Configuración de Docker
│   └── docker-compose.yml    # Orquestación de servicios
│
└── Front-Ecommerce/           # Frontend Next.js
    ├── app/                   # App Router de Next.js
    │   ├── api/              # API Routes
    │   ├── components/       # Componentes React
    │   ├── cart/             # Página del carrito
    │   ├── dashboard/        # Panel de administración
    │   ├── products/         # Página de productos
    │   └── profile/          # Perfil de usuario
    ├── context/              # Context API de React
    ├── public/               # Archivos estáticos
    ├── styles/               # Estilos CSS
    ├── Dockerfile            # Configuración de Docker
    └── docker-compose.yml    # Orquestación de servicios
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- Docker y Docker Compose
- Git

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd Ecommerce
```

### 2. Backend
```bash
cd BackendEcommercr
npm install
```

### 3. Frontend
```bash
cd Front-Ecommerce
npm install
```

### 4. Variables de entorno
Copiar los archivos de ejemplo y configurar con tus valores:

**Backend:**
```bash
cd BackendEcommercr
cp env.example .env
# Editar .env con tus valores reales
```

**Frontend:**
```bash
cd Front-Ecommerce
cp env.example .env.local
# Editar .env.local con tus valores reales
```

**Ejemplo de .env para Backend:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
NODE_ENV=development
```

## 🚀 Ejecución

### Opción 1: Con Docker (Recomendado)
```bash
# Backend
cd BackendEcommercr
docker-compose up -d

# Frontend
cd Front-Ecommerce
docker-compose up -d
```

### Opción 2: Desarrollo local
```bash
# Backend
cd BackendEcommercr
npm run dev

# Frontend (en otra terminal)
cd Front-Ecommerce
npm run dev
```

## 🌐 URLs de Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 📚 Características Principales

### Backend
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ Gestión de usuarios y roles
- ✅ CRUD de productos
- ✅ Sistema de pedidos
- ✅ Upload de archivos
- ✅ Validación de datos
- ✅ Middleware de autorización
- ✅ Documentación Swagger

### Frontend
- ✅ Interfaz moderna y responsive
- ✅ Sistema de autenticación
- ✅ Catálogo de productos
- ✅ Carrito de compras
- ✅ Panel de administración
- ✅ Gestión de usuarios
- ✅ Mapas interactivos
- ✅ Integración con pasarelas de pago

## 🔧 Scripts Disponibles

### Backend
```bash
npm start          # Iniciar en producción
npm run dev        # Iniciar en desarrollo
npm test           # Ejecutar tests
```

### Frontend
```bash
npm run dev        # Iniciar en desarrollo
npm run build      # Construir para producción
npm start          # Iniciar en producción
npm run lint       # Linting del código
```

## 🐳 Docker

El proyecto incluye configuración completa de Docker para facilitar el despliegue:

- **Backend**: Contenedor Node.js con hot-reload
- **Frontend**: Contenedor Next.js optimizado
- **MongoDB**: Base de datos persistente
- **Volúmenes**: Persistencia de datos y uploads

## 🚀 Despliegue en Producción

### Plataformas Recomendadas
- **Frontend**: [Vercel](https://vercel.com) - Optimizado para Next.js
- **Backend**: [Render](https://render.com) - Fácil y gratuito
- **Base de Datos**: [MongoDB Atlas](https://mongodb.com/atlas) - Plan gratuito disponible

### Guía Completa
Consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas de despliegue paso a paso.

### Despliegue Rápido
```bash
# 1. Subir código a GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Conectar repositorio a Vercel (Frontend)
# 3. Conectar repositorio a Render (Backend)
# 4. Configurar MongoDB Atlas
# 5. Configurar variables de entorno
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login de usuarios
- `POST /api/auth/logout` - Logout

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Usuarios
- `GET /api/users/profile` - Perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `GET /api/admin/users` - Listar usuarios (Admin)

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders` - Listar pedidos del usuario
- `GET /api/admin/orders` - Listar todos los pedidos (Admin)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🔒 Seguridad y Variables de Entorno

### ⚠️ **IMPORTANTE: No subir credenciales a GitHub**

**Archivos que NUNCA debes subir:**
- `.env` - Variables de entorno del backend
- `.env.local` - Variables de entorno del frontend
- `uploads/` - Archivos subidos por usuarios
- `node_modules/` - Dependencias instaladas

**Archivos de ejemplo incluidos:**
- `BackendEcommercr/env.example` - Ejemplo para backend
- `Front-Ecommerce/env.example` - Ejemplo para frontend

### 🛡️ **Buenas Prácticas de Seguridad:**
1. **Nunca** commits credenciales reales
2. **Siempre** usa archivos `.env` para configuraciones sensibles
3. **Verifica** que `.gitignore` esté configurado correctamente
4. **Usa** variables de entorno diferentes para desarrollo y producción

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

**Leonardo** - [Tu GitHub](https://github.com/Leonardo0622)

## 🙏 Agradecimientos

- Next.js por el framework increíble
- Express.js por la simplicidad del backend
- MongoDB por la flexibilidad de la base de datos
- Docker por la facilidad de despliegue

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub! 
