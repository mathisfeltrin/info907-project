# Classification Project - Pilotes, Circuits, Voitures

Projet de classification d'entités (pilotes, circuits, voitures) avec React et Node.js.

## Structure du projet

- `server.js` - Serveur Node.js avec Express
- `client/` - Application React avec Vite

## Installation

### Backend

```bash
npm install
```

### Frontend

```bash
cd client
npm install
```

## Lancement

### Backend (port 3000)

```bash
npm start
```

Ou avec nodemon pour le développement:

```bash
npm run dev
```

### Frontend (port 5173)

```bash
cd client
npm run dev
```

## API Endpoints

- `GET /api/all` - Récupère toutes les données (pilotes, circuits, voitures, caractéristiques)
- `GET /api/drivers` - Récupère les pilotes
- `GET /api/circuits` - Récupère les circuits
- `GET /api/cars` - Récupère les voitures
- `GET /api/characteristics` - Récupère les caractéristiques
- `POST /api/distance` - Calcule la distance entre deux entités

## Fonctionnalités

- Classification automatique basée sur les caractéristiques
- Calcul de similarité entre entités
- Interface avec onglets pour naviguer entre pilotes, circuits et voitures
- Affichage des 3 entités les plus similaires pour chaque élément
- Code couleur pour visualiser la similarité

## Technologie

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Algorithme**: Calcul de distance basé sur les caractéristiques communes
