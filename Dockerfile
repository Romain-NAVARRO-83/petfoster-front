# Utiliser l'image officielle de Node.js
FROM node:20 AS builder

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm && pnpm install

# Copier tout le code source
COPY . .

# Build du projet
RUN pnpm run build

# Étape de production : Utiliser Nginx pour servir l'app
FROM nginx:alpine

# Copier les fichiers générés par Vite dans Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]