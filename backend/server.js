import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://192.168.221.1:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/data", express.static(path.join(__dirname, "data")));

const readDataFile = () => {
  const filePath = path.join(__dirname, "data", "data.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

let data = readDataFile();

app.get("/api/possessions", (req, res) => {
  const patrimoine = data.find((item) => item.model === "Patrimoine");
  if (patrimoine) {
    res.json(patrimoine.data.possessions);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.get("/api/possessions/:libelle", (req, res) => {
  const { libelle } = req.params;
  const patrimoine = data.find((item) => item.model === "Patrimoine");
  if (patrimoine) {
    const possession = patrimoine.data.possessions.find(
      (p) => p.libelle === libelle
    );
    if (possession) {
      res.json(possession);
    } else {
      res.status(404).json({ message: "Possession not found" });
    }
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.post("/api/possessions", (req, res) => {
  const newPossession = req.body;
  const patrimoine = data.find((item) => item.model === "Patrimoine");
  if (patrimoine) {
    newPossession.id = uuidv4();
    patrimoine.data.possessions.push(newPossession);
    fs.writeFileSync(
      path.join(__dirname, "data", "data.json"),
      JSON.stringify(data, null, 2)
    );
    res.status(201).json(newPossession);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.put("/api/possessions/:libelle", (req, res) => {
  const { libelle } = req.params;
  const updatedPossession = req.body;
  const patrimoine = data.find((item) => item.model === "Patrimoine");
  if (patrimoine) {
    const index = patrimoine.data.possessions.findIndex(
      (p) => p.libelle === libelle
    );
    if (index !== -1) {
      patrimoine.data.possessions[index] = updatedPossession;
      fs.writeFileSync(
        path.join(__dirname, "data", "data.json"),
        JSON.stringify(data, null, 2)
      );
      res.json(updatedPossession);
    } else {
      res.status(404).json({ message: "Possession not found" });
    }
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.delete("/api/possessions/:libelle", (req, res) => {
  const { libelle } = req.params;
  const patrimoine = data.find((item) => item.model === "Patrimoine");
  if (patrimoine) {
    const index = patrimoine.data.possessions.findIndex(
      (p) => p.libelle === libelle
    );
    if (index !== -1) {
      patrimoine.data.possessions.splice(index, 1);
      fs.writeFileSync(
        path.join(__dirname, "data", "data.json"),
        JSON.stringify(data, null, 2)
      );
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Possession not found" });
    }
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
