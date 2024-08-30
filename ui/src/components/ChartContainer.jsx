import React, { useState } from 'react';
import PatrimoineValue from './PatrimoineValue';

function ChartContainer() {
  const [patrimoineValue, setPatrimoineValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleGetValue = async (date) => {
    try {
      const response = await fetch('http://localhost:3000/patrimoine-valeur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date.toISOString() }),
      });

      const data = await response.json();
      setPatrimoineValue(data.valeur);
      setSelectedDate(date);
    } catch (error) {
      console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
    }
  };

  return (
    <div>
      <PatrimoineValue onGetValue={handleGetValue} />
      {patrimoineValue !== null && selectedDate && (
        <div>
          <h2>Valeur du patrimoine au {selectedDate.toLocaleDateString()} : {patrimoineValue}€</h2>
        </div>
      )}
    </div>
  );
}

export default ChartContainer;
