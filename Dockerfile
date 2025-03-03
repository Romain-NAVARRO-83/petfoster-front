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

# Installer les dépendances nécessaires pour Certbot
RUN apk update && apk add --no-cache python3 py3-pip augeas

# Configurer Certbot
RUN python3 -m venv /opt/certbot
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Copier le script d'initialisation
# COPY 40-run-certbot.sh /40-run-certbot.sh
# RUN chmod +x /40-run-certbot.sh

# Ajouter la tâche cron pour le renouvellement automatique des certificats
RUN echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | tee -a /etc/crontab > /dev/null

# Exposer les ports 80 et 443
EXPOSE 80 443

# Lancer Nginx
# ENTRYPOINT ["/40-run-certbot.sh"]
CMD ["nginx", "-g", "daemon off;"]