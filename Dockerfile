# Étape de production : Utiliser Nginx pour servir l'app
FROM nginx:alpine

# Copier les fichiers générés par Vite dans Nginx
# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# COPY default.conf /etc/nginx/conf.d/default.conf

# # Installer les dépendances nécessaires pour Certbot
 RUN apk update && apk add --no-cache python3 py3-pip augeas

# # Configurer Certbot
 RUN python3 -m venv /opt/certbot
 RUN /opt/certbot/bin/pip install --upgrade pip
 RUN /opt/certbot/bin/pip install certbot certbot-nginx
 RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# # Copier le script d'initialisation
# COPY 40-run-certbot.sh /docker-entrypoint.d/40-run-certbot.sh
# RUN chmod +x /docker-entrypoint.d/40-run-certbot.sh

# # Ajouter la tâche cron pour le renouvellement automatique des certificats
RUN echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | tee -a /etc/crontab > /dev/null

# Exposer les ports 80 et 443
EXPOSE 80 443

# Lancer Nginx
# ENTRYPOINT ["/40-run-certbot.sh"]
#CMD ["nginx", "-g", "daemon off;"]
