# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Expone el puerto en el que corre la app (ajusta según tu configuración)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
