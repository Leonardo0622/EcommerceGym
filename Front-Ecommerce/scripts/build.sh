#!/bin/bash

# Script de build para producción
echo "🚀 Iniciando build para producción..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf .next
rm -rf out

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci --only=production

# Build de producción
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar build
if [ -d ".next" ]; then
    echo "✅ Build completado exitosamente!"
    echo "📁 Archivos generados en .next/"
else
    echo "❌ Error en el build"
    exit 1
fi

echo "🎉 ¡Listo para desplegar en Vercel!" 