# Étape 1 : Construire l'application
FROM debian:latest

# Définir le répertoire de travail
WORKDIR /app

# Installer Node.js et npm
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm -v

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Configurer ulimit pour permettre la création de dumps
RUN npm cache verify

# Installer les dépendances
RUN npm install

# Copier tout le contenu du projet
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port 5173
EXPOSE 5173

# Ajouter la variable d'environnement API_URL
RUN echo "VITE_API_BASE_URL=${API_URL}" > .env

# Commande par défaut pour lancer l'application
CMD ["npm", "run", "start"]
