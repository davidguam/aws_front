# Etapa 1: Construcción
FROM node:18 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servir la app con un servidor estático
FROM nginx:alpine

# Eliminar la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos compilados desde la etapa de construcción al contenedor de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 3000 (puerto donde corre el frontend)
EXPOSE 3000

# Comando para ejecutar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
