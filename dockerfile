# Étape 1 : Construire l'application
FROM node:22

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du projet
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port 80
EXPOSE 5173

ENV API_URL=http://localhost:3000/api

RUN echo "VITE_API_BASE_URL=${API_URL}" > .env

# Commande par défaut pour lancer Nginx
CMD ["npm", "run", "start"]
