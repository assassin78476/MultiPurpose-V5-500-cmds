#!/bin/bash
echo "Suppression des anciens modules..."
rm -rf node_modules package-lock.json

echo "Installation des dépendances..."
npm install

echo "Démarrage du bot..."
node index.js

