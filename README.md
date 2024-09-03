# Utilisation Docker

## Initialisation

1. Verifier que l'extension Prettier est installée
2. lancer la commande `pnpm run compose:dev` (On devrait se retrouver dans l'instace Vite exposant le localhost:5173)
3. Lancer un second terminal et y lancer la commander `pnpm run container:client`; Pour avoir un acces au container et y lancer des commandes de bases comme `pnpm i`.

HOP-LA !

## Installer un nouveau module

1. Dans le terminal permettant d'executer du code dans un container, avant d'executer la commande d'installation de votre module, lancer `pnpm i` puis valider avec `Y`

## Si besoin de reinitialiser les container

1. `pnpm run rm:container`
2. `pnpm run compose:dev`
