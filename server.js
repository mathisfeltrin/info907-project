const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Ontologie - caractéristiques pour classification
const rawDifferences = [
  // Pilotage
  { agressif: "Agressif", fluide: "Fluide" },
  {
    adherenceForte: "Adhérence forte",
    adherenceModeree: "Adhérence modérée",
    adherenceFaible: "Adhérence faible",
  },

  // Course
  { longue: "Longue", courte: "Courte" },
  { lineaire: "Linéaire", etape: "Étape", tours: "Tours" },

  // Aéro
  {
    aeroImportant: "Aérodynamique importante",
    aeroFaible: "Aérodynamique faible",
  },

  // Motorisation
  { thermique: "Thermique", electrique: "Électrique", hybride: "Hybride" },

  // Écurie
  {
    ecuriePerformance: "Écurie de performance",
    ecurieEngagement: "Écurie engagement",
  },

  // Terrain
  { circuit: "Circuit", nonCircuit: "Non Circuit" },
  { unique: "Unique", varie: "Varié" },
  {
    bitume: "Bitume",
    terre: "Terre",
    sable: "Sable",
    neigeGlace: "Neige/Glace",
  },
  { escarpe: "Escarpe", nonEscarpe: "Non Escarpe" },
];

// Exemples de pilotes
const drivers = {
  Verstappen: [
    "agressif",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  Hamilton: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  Loeb: [
    "agressif",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  Petty: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  Block: [
    "agressif",
    "adherenceFaible",
    "longue",
    "lineaire",
    "aeroFaible",
    "thermique",
    "ecurieEngagement",
    "nonCircuit",
    "unique",
    100,
    0,
    0,
    0,
    "escarpe",
  ],
  Peterhansel: [
    "fluide",
    "adherenceModeree",
    "longue",
    "etape",
    "aeroFaible",
    "electrique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    0,
    30,
    70,
    0,
    "escarpe",
  ],
  Mouton: [
    "fluide",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  Ickx: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
};

// Exemples de circuits
const circuits = {
  Spa: [
    "agressif",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  Monaco: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  MonteCarlo: [
    "agressif",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  Indianapolis: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  PikesPeak: [
    "agressif",
    "adherenceFaible",
    "longue",
    "lineaire",
    "aeroFaible",
    "thermique",
    "ecurieEngagement",
    "nonCircuit",
    "unique",
    100,
    0,
    0,
    0,
    "escarpe",
  ],
  Dakar: [
    "fluide",
    "adherenceModeree",
    "longue",
    "etape",
    "aeroFaible",
    "electrique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    0,
    30,
    70,
    0,
    "escarpe",
  ],
  Suede: [
    "fluide",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  LeMans: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
};

// Exemples de voitures
const cars = {
  RB23: [
    "agressif",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  W14: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "hybride",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  C4WRC: [
    "agressif",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  PlymouthSuperbird: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
  Hoonicorn: [
    "agressif",
    "adherenceFaible",
    "longue",
    "lineaire",
    "aeroFaible",
    "thermique",
    "ecurieEngagement",
    "nonCircuit",
    "unique",
    100,
    0,
    0,
    0,
    "escarpe",
  ],
  Peugeot2008: [
    "fluide",
    "adherenceModeree",
    "longue",
    "etape",
    "aeroFaible",
    "electrique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    0,
    30,
    70,
    0,
    "escarpe",
  ],
  AudiQuattro: [
    "fluide",
    "adherenceModeree",
    "courte",
    "etape",
    "aeroFaible",
    "thermique",
    "ecuriePerformance",
    "nonCircuit",
    "varie",
    60,
    30,
    0,
    10,
    "escarpe",
  ],
  Porsche917: [
    "fluide",
    "adherenceForte",
    "longue",
    "tours",
    "aeroImportant",
    "thermique",
    "ecuriePerformance",
    "circuit",
    "unique",
    100,
    0,
    0,
    0,
    "nonEscarpe",
  ],
};

// Fonction de calcul de distance entre deux entités
function getDistance(obj1, obj2) {
  let sum = 0;
  let count = 0;
  for (let i in obj1) {
    if (obj1[i] != "" && obj2[i] != "") {
      if (obj1[i] == obj2[i]) {
        sum++;
      }
      count++;
    }
  }
  if (count == 0) return 2;
  else return 1 - sum / count;
}

// Routes API
app.get("/api/differences", (req, res) => {
  res.json(rawDifferences);
});

app.get("/api/drivers", (req, res) => {
  res.json(drivers);
});

app.get("/api/circuits", (req, res) => {
  res.json(circuits);
});

app.get("/api/cars", (req, res) => {
  res.json(cars);
});

app.get("/api/all", (req, res) => {
  res.json({
    differences: rawDifferences,
    drivers,
    circuits,
    cars,
  });
});

// Route pour calculer la distance entre deux entités
app.post("/api/distance", (req, res) => {
  const { entity1, entity2 } = req.body;
  const distance = getDistance(entity1, entity2);
  res.json({ distance });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
