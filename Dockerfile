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

RUN apt-get update -y
RUN apt install -y python3 python3-venv libaugeas0
RUN apt-get remove certbot
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot
# RUN /opt/certbot/bin/certbot certonly --nginx
RUN echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && sudo certbot renew -q" | tee -a /etc/crontab > /dev/null

# Exposer le port 80
EXPOSE 80 443

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]