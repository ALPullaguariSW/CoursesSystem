# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia la configuración de Nginx (opcional, si tienes una personalizada)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de la compilación (la carpeta 'build')
COPY build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]