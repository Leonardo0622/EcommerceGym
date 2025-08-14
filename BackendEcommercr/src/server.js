// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

// Importar las rutas
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const ordersRouter = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");  // Nuevas rutas de administración
const healthRoutes = require("./routes/health.routes"); // Health check para deployment

const app = express();

// Verificar si la URI de MongoDB se carga correctamente
console.log("🔍 Variables de entorno:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Configurada" : "❌ No configurada");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Configurada" : "❌ No configurada");

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: No se encontró MONGODB_URI en las variables de entorno");
  console.error("Por favor, configura MONGODB_URI en Render");
  process.exit(1);
}

console.log("🔗 Intentando conectar a MongoDB...");
console.log("📡 URI de MongoDB:", mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Ocultar credenciales

// Asegurar que la URI tenga la base de datos
if (!mongoUri.includes('/ecommerce')) {
  const correctedUri = mongoUri.replace('?', '/ecommerce?');
  console.log("🔧 Corrigiendo URI para incluir base de datos...");
  mongoose.connect(correctedUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Conectado exitosamente a MongoDB");
    console.log("🗄️  Base de datos:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    console.error("🔧 Verifica que MONGODB_URI esté configurada correctamente en Render");
    console.error("🌐 Si usas MongoDB Atlas, verifica que la IP esté en la whitelist");
    process.exit(1);
  });
} else {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Conectado exitosamente a MongoDB");
    console.log("🗄️  Base de datos:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    console.error("🔧 Verifica que MONGODB_URI esté configurada correctamente en Render");
    console.error("🌐 Si usas MongoDB Atlas, verifica que la IP esté en la whitelist");
    process.exit(1);
  });
}
console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET ? "✅ Configurada" : "❌ No configurada");

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout más corto
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("✅ Conectado exitosamente a MongoDB");
  console.log("🗄️  Base de datos:", mongoose.connection.name);
})
.catch((error) => {
  console.error("❌ Error al conectar con MongoDB:", error.message);
  console.error("🔧 Verifica que MONGODB_URI esté configurada correctamente en Render");
  console.error("🌐 Si usas MongoDB Atlas, verifica que la IP esté en la whitelist");
  process.exit(1);
});

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'https://ecommerce-frontend-nine-iota.vercel.app'],
  credentials: true
}));
app.use(morgan("dev"));

// Configuración específica para servir imágenes
app.use('/uploads', (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://ecommerce-frontend-nine-iota.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas de la API
app.use("/api/auth", authRoutes);    // Para login, register, etc.
app.use("/api/auth", userRoutes);    // Para /api/auth/profile, etc.
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRoutes);  // Nuevas rutas de administración
app.use("/api", healthRoutes);       // Health check endpoint

// Ruta principal (Opcional)
app.get("/", (req, res) => {
  res.send("API Ecommerce funcionando 🚀");
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});