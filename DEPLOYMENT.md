# 🚀 Guía de Despliegue - Ecommerce Full-Stack

## 📋 **Resumen del Despliegue**

- **Frontend (Next.js)**: Vercel (Gratis, optimizado para Next.js)
- **Backend (Node.js)**: Render (Gratis, fácil de configurar)
- **Base de Datos**: MongoDB Atlas (Gratis hasta 512MB)

---

## 🌐 **Paso 1: Desplegar el Backend en Render**

### 1.1 Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Regístrate con tu cuenta de GitHub
- Selecciona el plan gratuito

### 1.2 Crear nuevo servicio web
1. Click en "New +" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio `Ecommerce`
4. Configuración:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 1.3 Configurar variables de entorno
En la sección "Environment Variables":
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
CORS_ORIGIN=https://tu-frontend.vercel.app
```

### 1.4 Desplegar
- Click en "Create Web Service"
- Espera a que se complete el build
- Anota la URL generada (ej: `https://ecommerce-backend.onrender.com`)

---

## 🎨 **Paso 2: Desplegar el Frontend en Vercel**

### 2.1 Crear cuenta en Vercel
- Ve a [vercel.com](https://vercel.com)
- Regístrate con tu cuenta de GitHub
- Selecciona el plan gratuito

### 2.2 Importar proyecto
1. Click en "New Project"
2. Importa tu repositorio de GitHub
3. Selecciona el repositorio `Ecommerce`
4. Configuración automática:
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Root Directory**: `Front-Ecommerce`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 Configurar variables de entorno
En la sección "Environment Variables":
```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
NEXT_PUBLIC_APP_NAME=Ecommerce App
NEXT_PUBLIC_APP_URL=https://tu-frontend.vercel.app
```

### 2.4 Desplegar
- Click en "Deploy"
- Espera a que se complete el build
- Tu aplicación estará disponible en `https://tu-proyecto.vercel.app`

---

## 🗄️ **Paso 3: Configurar MongoDB Atlas**

### 3.1 Crear cuenta en MongoDB Atlas
- Ve a [mongodb.com/atlas](https://mongodb.com/atlas)
- Regístrate para una cuenta gratuita
- Selecciona el plan "Free" (M0)

### 3.2 Crear cluster
1. Click en "Build a Database"
2. Selecciona "FREE" tier
3. Elige tu proveedor de nube preferido
4. Selecciona la región más cercana
5. Click en "Create"

### 3.3 Configurar acceso
1. **Database Access**:
   - Click en "Database Access" → "Add New Database User"
   - Username: `ecommerce_user`
   - Password: `genera_una_contraseña_segura`
   - Role: `Read and write to any database`
   - Click en "Add User"

2. **Network Access**:
   - Click en "Network Access" → "Add IP Address"
   - Click en "Allow Access from Anywhere" (0.0.0.0/0)
   - Click en "Confirm"

### 3.4 Obtener connection string
1. Click en "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Copia la connection string
4. Reemplaza `<password>` con la contraseña del usuario
5. Reemplaza `<dbname>` con `ecommerce`

---

## 🔧 **Paso 4: Actualizar Configuraciones**

### 4.1 Actualizar Next.js config
En `Front-Ecommerce/next.config.mjs`:
```javascript
images: {
  domains: ['localhost', 'tu-backend.onrender.com'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'tu-backend.onrender.com',
      pathname: '/uploads/**',
    },
  ],
},
```

### 4.2 Actualizar variables de entorno
- **Backend**: Usa la URL de Render en `MONGODB_URI`
- **Frontend**: Usa la URL de Render en `NEXT_PUBLIC_API_URL`

---

## 🚀 **Paso 5: Verificar el Despliegue**

### 5.1 Backend
- Verifica: `https://tu-backend.onrender.com/api/health`
- Debería devolver: `{"status":"OK","timestamp":"..."}`

### 5.2 Frontend
- Abre tu URL de Vercel
- Verifica que se conecte al backend
- Prueba el login/registro

### 5.3 Base de datos
- Verifica en MongoDB Atlas que se hayan creado las colecciones
- Prueba crear un usuario desde la aplicación

---

## 🔒 **Seguridad en Producción**

### Variables de entorno
- **NUNCA** commits credenciales reales
- **SIEMPRE** usa variables de entorno
- **ROTA** las claves JWT regularmente

### CORS
- Configura `CORS_ORIGIN` solo con dominios permitidos
- No uses `*` en producción

### MongoDB
- Usa conexiones con SSL
- Configura IP whitelist si es posible
- Usa contraseñas fuertes

---

## 📱 **Dominios Personalizados (Opcional)**

### Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones

### Render
1. Ve a tu servicio en Render
2. Settings → Custom Domains
3. Agrega tu dominio
4. Configura los DNS

---

## 🆘 **Solución de Problemas Comunes**

### Error de CORS
- Verifica que `CORS_ORIGIN` incluya tu dominio de Vercel
- Asegúrate de que el protocolo sea `https://`

### Error de conexión a MongoDB
- Verifica que la IP esté en la whitelist de MongoDB Atlas
- Confirma que el usuario y contraseña sean correctos

### Build falla en Vercel
- Verifica que `package.json` esté en la carpeta `Front-Ecommerce`
- Asegúrate de que todas las dependencias estén en `dependencies`

### Imágenes no se cargan
- Verifica que el dominio esté en `next.config.mjs`
- Confirma que las rutas de uploads estén funcionando

---

## 🎉 **¡Listo!**

Tu aplicación de ecommerce estará disponible en:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-backend.onrender.com`
- **API Docs**: `https://tu-backend.onrender.com/api-docs` (si tienes Swagger)

---

## 📞 **Soporte**

Si tienes problemas:
1. Revisa los logs en Render y Vercel
2. Verifica las variables de entorno
3. Confirma que MongoDB Atlas esté funcionando
4. Revisa la consola del navegador para errores de CORS

¡Buena suerte con tu despliegue! 🚀 