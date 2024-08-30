import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function InsertPossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPossession = {
      libelle,
      valeur: parseFloat(valeur),
      dateDebut: new Date(dateDebut),
      dateFin: dateFin ? new Date(dateFin) : null,
      tauxAmortissement: parseFloat(tauxAmortissement),
    };

    console.log('Nouvelle possession ajoutée:', newPossession);

    setLibelle('');
    setValeur('');
    setDateDebut('');
    setDateFin('');
    setTauxAmortissement('');
  };

  return (
    <div>
      <h1>Ajouter une possession</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libellé"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrer la valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDateDebut">
          <Form.Label>Date de début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDateFin">
          <Form.Label>Date de fin (optionnel)</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTauxAmortissement">
          <Form.Label>Taux d'amortissement (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrer le taux d'amortissement"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default InsertPossession;