import express from 'express';
import { read } from '../index.js'; // Assurez-vous que le chemin est correct pour votre projet
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const exemple = await read();
    res.send(exemple);
  } catch (e) {
    console.log(e);
  }
});

app.post('/patrimoine-valeur', async (req, res) => {
  try {
    const { date } = req.body;
    const data = await read();

    // Convertir la date string en objet Date
    const selectedDate = new Date(date);

    // Filtrer les possessions valides à la date sélectionnée
    const possessions = data.filter(item => new Date(item.data.date) <= selectedDate);

    // Calculer la valeur totale du patrimoine
    const valeurPatrimoine = possessions.reduce((acc, item) => acc + item.data.valeur, 0);

    res.json({ valeur: valeurPatrimoine });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du calcul de la valeur du patrimoine.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
