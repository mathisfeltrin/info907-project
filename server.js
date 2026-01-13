const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Ontologie - caractéristiques pour classification
const rawCharacteristics = [];

// Exemples de pilotes
const drivers = {};

// Exemples de circuits
const circuits = {};

// Exemples de voitures
const cars = {};

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
app.get("/api/characteristics", (req, res) => {
  res.json(rawCharacteristics);
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
    characteristics: rawCharacteristics,
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
