#!/bin/sh

# Démarrer Nginx en arrière-plan
nginx &

# Attendre que Nginx démarre complètement
sleep 5

# Obtenir/renouveler le certificat SSL avec Certbot
certbot --nginx -n -d petfoster.fr -d www.petfoster.fr --agree-tos --email matteomonterosso.pro@gmail.com

# Maintenir le conteneur en vie
exec nginx -g "daemon off;"